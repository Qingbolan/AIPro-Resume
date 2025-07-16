#!/usr/bin/env python3
"""
Reproduce the sync issue by checking different scenarios
"""
import sys
import os
from pathlib import Path

# Add the backend path to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'file-system')
sys.path.insert(0, backend_path)

from silan.logic.database_sync_logic import DatabaseSyncLogic
from silan.logic.content_logic import ContentLogic
from silan.parsers.idea_parser import IdeaParser

def test_idea_parser_directly():
    """Test the idea parser directly on each file"""
    print("🔍 Testing Idea Parser Directly")
    print("=" * 50)
    
    content_dir = Path("content")
    idea_parser = IdeaParser(content_dir)
    
    # Test all .md files in ideas directory
    ideas_dir = content_dir / "ideas"
    all_md_files = list(ideas_dir.rglob("*.md"))
    
    print(f"Found {len(all_md_files)} .md files in ideas directory:")
    for md_file in all_md_files:
        print(f"  {md_file.relative_to(content_dir)}")
    
    print("\nTesting direct file parsing:")
    for md_file in all_md_files:
        try:
            result = idea_parser.parse_file(md_file)
            if result:
                print(f"✅ {md_file.name}: {result.main_entity.get('title', 'No title')}")
            else:
                print(f"❌ {md_file.name}: Parse failed")
        except Exception as e:
            print(f"❌ {md_file.name}: Error - {e}")

def test_different_discovery_methods():
    """Test different content discovery methods"""
    print("\n🔍 Testing Different Discovery Methods")
    print("=" * 50)
    
    content_logic = ContentLogic()
    
    # Method 1: Current logic
    print("Method 1: Current _get_content_items_for_type")
    ideas_dir = content_logic.content_types['ideas']
    items = content_logic._get_content_items_for_type(ideas_dir, 'ideas')
    print(f"Found {len(items)} items:")
    for item in items:
        print(f"  {item['name']} ({item['type']})")
    
    # Method 2: Check if there's recursive discovery
    print("\nMethod 2: Recursive .md file discovery")
    all_md_files = list(ideas_dir.rglob("*.md"))
    print(f"All .md files: {len(all_md_files)}")
    for md_file in all_md_files:
        print(f"  {md_file.relative_to(ideas_dir)}")
    
    # Method 3: Check if previous logic might have been different
    print("\nMethod 3: Check if we're parsing sub-files as separate ideas")
    idea_parser = IdeaParser(content_logic.content_dir)
    
    # This simulates old behavior that might have parsed every .md file
    for md_file in all_md_files:
        # Skip README.md files as they're handled by folder parsing
        if md_file.name == 'README.md':
            continue
            
        try:
            result = idea_parser.parse_file(md_file)
            if result:
                title = result.main_entity.get('title', 'No title')
                print(f"  Sub-file {md_file.name} would create: {title}")
        except Exception as e:
            print(f"  Sub-file {md_file.name} failed: {e}")

def analyze_database_ids():
    """Analyze the database IDs to understand the pattern"""
    print("\n🔍 Analyzing Database IDs")
    print("=" * 50)
    
    import sqlite3
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT title, slug, abstract FROM ideas ORDER BY title")
    ideas = cursor.fetchall()
    
    print(f"Database contains {len(ideas)} ideas:")
    for title, slug, abstract in ideas:
        print(f"  Title: {title or 'EMPTY'}")
        print(f"  Slug: {slug}")
        print(f"  Abstract: {abstract[:50] if abstract else 'EMPTY'}...")
        print()
    
    conn.close()

if __name__ == "__main__":
    test_idea_parser_directly()
    test_different_discovery_methods()
    analyze_database_ids()