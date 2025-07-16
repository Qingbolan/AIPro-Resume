#!/usr/bin/env python3
"""
Debug script to understand project sync issues
"""
import sys
import os
from pathlib import Path

# Add the backend path to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'file-system')
sys.path.insert(0, backend_path)

from silan.logic.content_logic import ContentLogic
from silan.parsers.project_parser import ProjectParser

def debug_projects():
    """Debug project sync issues"""
    print("🔍 Debugging Project Sync Issues")
    print("=" * 50)
    
    content_logic = ContentLogic()
    
    # Get all content for sync and check projects
    sync_content = content_logic.get_all_content_for_sync()
    project_items = [item for item in sync_content if item['type'] == 'projects']
    
    print(f"Found {len(project_items)} project items:")
    for i, item in enumerate(project_items, 1):
        print(f"\n{i}. Project: {item['name']}")
        print(f"   Path: {item['path']}")
        print(f"   Hash: {item['hash'][:16]}...")
        
        # Check data structure
        data = item.get('data', {})
        print(f"   Data keys: {list(data.keys())}")
        print(f"   Title: {data.get('title', 'MISSING')}")
        print(f"   Description: {data.get('description', 'MISSING')[:50]}...")
        print(f"   GitHub: {data.get('github_url', 'MISSING')}")
        print(f"   Status: {data.get('status', 'MISSING')}")
        
        # Check if slug generation is working
        print(f"   Slug: {data.get('slug', 'MISSING')}")
        
        # Check technologies
        technologies = data.get('technologies', [])
        print(f"   Technologies: {len(technologies)} items")
        if technologies:
            for tech in technologies[:3]:  # Show first 3
                print(f"     - {tech}")

if __name__ == "__main__":
    debug_projects()