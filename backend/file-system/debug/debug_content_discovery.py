#!/usr/bin/env python3
"""
Debug script to understand what content discovery logic is finding
"""
import sys
import os

# Add the backend path to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'file-system')
sys.path.insert(0, backend_path)

from silan.logic.content_logic import ContentLogic

def debug_content_discovery():
    """Debug what content is being discovered"""
    print("🔍 Debugging Content Discovery")
    print("=" * 50)
    
    content_logic = ContentLogic()
    
    # Check what the content logic finds
    print("📁 Content directory:", content_logic.content_dir)
    print("📁 Content types:", content_logic.content_types)
    print()
    
    # Test content analysis
    print("📊 Content Analysis:")
    analysis = content_logic.analyze_content_for_sync()
    print(f"Status: {analysis['status']}")
    print(f"Total files: {analysis['total_files']}")
    print(f"Content types: {analysis['content_types']}")
    print()
    
    # Test detailed content discovery
    print("📋 Detailed Content Discovery:")
    
    for content_type, type_dir in content_logic.content_types.items():
        if not type_dir.exists():
            print(f"{content_type}: Directory doesn't exist")
            continue
            
        print(f"\n{content_type.upper()}:")
        print(f"  Directory: {type_dir}")
        
        # Get content items for this type
        content_items = content_logic._get_content_items_for_type(type_dir, content_type)
        print(f"  Found {len(content_items)} items:")
        
        for i, item in enumerate(content_items, 1):
            print(f"    {i}. Type: {item['type']}")
            print(f"       Path: {item['path']}")
            print(f"       Main file: {item['main_file']}")
            print(f"       Name: {item['name']}")
            print()
    
    # Test sync content
    print("\n📝 Content for Sync:")
    sync_content = content_logic.get_all_content_for_sync()
    print(f"Total sync items: {len(sync_content)}")
    
    for content_type in ['blog', 'projects', 'ideas', 'updates']:
        type_items = [item for item in sync_content if item['type'] == content_type]
        print(f"  {content_type}: {len(type_items)} items")
        
        for item in type_items:
            print(f"    - {item['name']} ({item['id']})")

if __name__ == "__main__":
    debug_content_discovery()