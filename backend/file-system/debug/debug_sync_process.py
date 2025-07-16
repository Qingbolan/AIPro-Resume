#!/usr/bin/env python3
"""
Debug script to understand the actual sync process
"""
import sys
import os
from pathlib import Path

# Add the backend path to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'file-system')
sys.path.insert(0, backend_path)

from silan.logic.content_logic import ContentLogic
from silan.parsers.project_parser import ProjectParser
from silan.parsers.idea_parser import IdeaParser

def debug_sync_process():
    """Debug the actual sync process step by step"""
    print("🔍 Debugging Sync Process")
    print("=" * 50)
    
    content_logic = ContentLogic()
    
    # Get all content for sync
    print("📝 Getting all content for sync...")
    sync_content = content_logic.get_all_content_for_sync()
    
    print(f"Total items for sync: {len(sync_content)}")
    print()
    
    # Group by type
    for content_type in ['blog', 'projects', 'ideas', 'updates']:
        type_items = [item for item in sync_content if item['type'] == content_type]
        print(f"\n🔍 {content_type.upper()} ({len(type_items)} items):")
        
        for i, item in enumerate(type_items, 1):
            print(f"  {i}. ID: {item['id']}")
            print(f"     Name: {item['name']}")
            print(f"     Path: {item['path']}")
            print(f"     Hash: {item['hash'][:16]}...")
            
            # Check data structure
            data = item.get('data', {})
            print(f"     Data keys: {list(data.keys())}")
            
            # Check for key fields
            if content_type == 'projects':
                print(f"     Title: {data.get('title', 'N/A')}")
                print(f"     Description: {data.get('description', 'N/A')[:50]}...")
                print(f"     GitHub URL: {data.get('github_url', 'N/A')}")
                print(f"     Demo URL: {data.get('demo_url', 'N/A')}")
                print(f"     Technologies: {data.get('technologies', [])}")
                
            elif content_type == 'ideas':
                print(f"     Title: {data.get('title', 'N/A')}")
                print(f"     Abstract: {data.get('abstract', 'N/A')[:50]}...")
                print(f"     Motivation: {data.get('motivation', 'N/A')[:50]}...")
                print(f"     Status: {data.get('status', 'N/A')}")
                
            print()

def debug_individual_parsing():
    """Debug individual parsing of projects and ideas"""
    print("\n🔍 Debugging Individual Parsing")
    print("=" * 50)
    
    content_dir = Path("content")
    
    # Test project parsing
    print("📁 Testing Project Parsing:")
    project_parser = ProjectParser(content_dir)
    
    project_dirs = [
        content_dir / "projects" / "ecommerce-platform",
        content_dir / "projects" / "ai-chatbot", 
        content_dir / "projects" / "data-visualization-tool"
    ]
    
    for project_dir in project_dirs:
        if project_dir.exists():
            print(f"\n  Testing: {project_dir.name}")
            try:
                result = project_parser.parse_folder(project_dir)
                if result:
                    print(f"    ✅ Parsed successfully")
                    print(f"    Title: {result.main_entity.get('title', 'N/A')}")
                    print(f"    Description: {result.main_entity.get('description', 'N/A')[:50]}...")
                    print(f"    GitHub URL: {result.main_entity.get('github_url', 'N/A')}")
                    print(f"    Technologies: {len(result.technologies)} techs")
                else:
                    print(f"    ❌ Parse failed - returned None")
            except Exception as e:
                print(f"    ❌ Parse failed with error: {e}")
    
    # Test idea parsing
    print("\n💡 Testing Idea Parsing:")
    idea_parser = IdeaParser(content_dir)
    
    idea_dirs = [
        content_dir / "ideas" / "ai-code-refactoring-tool",
        content_dir / "ideas" / "quantum-ml-framework"
    ]
    
    for idea_dir in idea_dirs:
        if idea_dir.exists():
            print(f"\n  Testing: {idea_dir.name}")
            try:
                result = idea_parser.parse_folder(idea_dir)
                if result:
                    print(f"    ✅ Parsed successfully")
                    print(f"    Title: {result.main_entity.get('title', 'N/A')}")
                    print(f"    Abstract: {result.main_entity.get('abstract', 'N/A')[:50]}...")
                    print(f"    Motivation: {result.main_entity.get('motivation', 'N/A')[:50]}...")
                    print(f"    Status: {result.main_entity.get('status', 'N/A')}")
                else:
                    print(f"    ❌ Parse failed - returned None")
            except Exception as e:
                print(f"    ❌ Parse failed with error: {e}")

def debug_file_discovery():
    """Debug what files are actually being discovered"""
    print("\n🔍 Debugging File Discovery")
    print("=" * 50)
    
    content_dir = Path("content")
    
    # Check all .md files in projects
    print("📁 All .md files in projects:")
    for md_file in (content_dir / "projects").rglob("*.md"):
        print(f"  {md_file.relative_to(content_dir)}")
    
    print("\n💡 All .md files in ideas:")
    for md_file in (content_dir / "ideas").rglob("*.md"):
        print(f"  {md_file.relative_to(content_dir)}")
    
    # Check what content_logic discovers
    print("\n📋 What content_logic discovers:")
    content_logic = ContentLogic()
    
    for content_type in ['projects', 'ideas']:
        type_dir = content_logic.content_types[content_type]
        if type_dir.exists():
            items = content_logic._get_content_items_for_type(type_dir, content_type)
            print(f"\n{content_type}:")
            for item in items:
                print(f"  Type: {item['type']}, Name: {item['name']}")
                print(f"  Path: {item['path']}")
                print(f"  Main file: {item['main_file']}")
                print()

if __name__ == "__main__":
    debug_file_discovery()
    debug_individual_parsing()
    debug_sync_process()