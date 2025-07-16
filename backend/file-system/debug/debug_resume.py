#!/usr/bin/env python3
"""
Debug script to understand resume parsing issues
"""
import sys
import os
from pathlib import Path

# Add the backend path to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'file-system')
sys.path.insert(0, backend_path)

from silan.logic.content_logic import ContentLogic
from silan.parsers.resume_parser import ResumeParser

def debug_resume():
    """Debug resume parsing issues"""
    print("🔍 Debugging Resume Parsing Issues")
    print("=" * 50)
    
    content_logic = ContentLogic()
    
    # Get all content for sync and check resume
    sync_content = content_logic.get_all_content_for_sync()
    resume_items = [item for item in sync_content if item['type'] == 'resume']
    
    print(f"Found {len(resume_items)} resume items:")
    for i, item in enumerate(resume_items, 1):
        print(f"\n{i}. Resume: {item['name']}")
        print(f"   Path: {item['path']}")
        print(f"   Hash: {item['hash'][:16]}...")
        
        # Check data structure
        data = item.get('data', {})
        print(f"   Data keys: {list(data.keys())}")
        
        # Check if structured data exists
        if 'education' in data:
            education_data = data['education']
            print(f"   Education: {len(education_data)} items")
            for j, edu in enumerate(education_data[:2]):  # Show first 2
                print(f"     {j+1}. {edu.get('institution', 'Unknown')} - {edu.get('degree', 'Unknown')}")
        else:
            print("   Education: NOT FOUND")
        
        if 'experience' in data:
            experience_data = data['experience']
            print(f"   Experience: {len(experience_data)} items")
            for j, exp in enumerate(experience_data[:2]):  # Show first 2
                print(f"     {j+1}. {exp.get('company', 'Unknown')} - {exp.get('position', 'Unknown')}")
        else:
            print("   Experience: NOT FOUND")
        
        if 'awards' in data:
            awards_data = data['awards']
            print(f"   Awards: {len(awards_data)} items")
            for j, award in enumerate(awards_data[:2]):  # Show first 2
                print(f"     {j+1}. {award.get('title', 'Unknown')}")
        else:
            print("   Awards: NOT FOUND")
            
        # Check frontmatter vs structured data
        if 'name' in data:
            print(f"   Name: {data.get('name', 'MISSING')}")
        if 'email' in data:
            print(f"   Email: {data.get('email', 'MISSING')}")
        if 'current' in data:
            print(f"   Current: {data.get('current', 'MISSING')}")

if __name__ == "__main__":
    debug_resume()