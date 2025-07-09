"""
Test script for the comprehensive parser system.

This script demonstrates the parser system working with real content files
and validates that it properly extracts sophisticated structured data.
"""

import sys
from pathlib import Path
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.json import JSON
import json

# Add the backend directory to Python path
backend_dir = Path(__file__).parent.parent.parent
sys.path.append(str(backend_dir))

from silan.parsers.parser_factory import ParserFactory, ParsedContentCollection

console = Console()

def test_parser_system():
    """Test the comprehensive parser system"""
    console.print("[bold blue]🧪 Testing Comprehensive Parser System[/bold blue]")
    console.print()
    
    # Set up paths
    content_dir = Path("/Users/macbook.silan.tech/Documents/GitHub/AIPro-Resume/api-test-portfolio/content")
    
    if not content_dir.exists():
        console.print(f"[red]❌ Content directory not found: {content_dir}[/red]")
        return False
    
    console.print(f"[green]✅ Content directory found: {content_dir}[/green]")
    console.print()
    
    # Test 1: Parse all content with auto-detection
    console.print("[bold yellow]📋 Test 1: Auto-Detection Parsing[/bold yellow]")
    
    try:
        parsed_data = ParserFactory.batch_parse_directory(content_dir)
        collection = ParsedContentCollection(parsed_data)
        
        # Display parsing results
        display_parsing_results(collection)
        
    except Exception as e:
        console.print(f"[red]❌ Auto-detection parsing failed: {e}[/red]")
        import traceback
        traceback.print_exc()
        return False
    
    console.print()
    
    # Test 2: Test specific parsers
    console.print("[bold yellow]📋 Test 2: Specific Parser Testing[/bold yellow]")
    
    test_files = {
        'resume': content_dir / 'resume' / 'resume.md',
        'project': content_dir / 'projects' / 'ai-chatbot.md',
        'blog': content_dir / 'blog' / 'llm-code-refactoring.md',
        'idea': content_dir / 'ideas' / 'ai-code-refactoring-tool.md'
    }
    
    for content_type, file_path in test_files.items():
        if file_path.exists():
            test_specific_parser(content_type, file_path, content_dir)
        else:
            console.print(f"[yellow]⚠️  {content_type} file not found: {file_path}[/yellow]")
    
    console.print()
    
    # Test 3: Validation and Quality Analysis
    console.print("[bold yellow]📋 Test 3: Validation and Quality Analysis[/bold yellow]")
    analyze_quality_and_validation(collection)
    
    console.print()
    console.print("[bold green]🎉 Parser system testing completed![/bold green]")
    return True

def display_parsing_results(collection: ParsedContentCollection):
    """Display parsing results in a formatted table"""
    stats = collection.get_statistics()
    
    # Create summary table
    table = Table(title="Parsing Results Summary")
    table.add_column("Content Type", style="cyan")
    table.add_column("Files Parsed", style="bold")
    table.add_column("Avg Quality", style="green")
    table.add_column("Validation Issues", style="red")
    
    for content_type, count in stats['by_type'].items():
        avg_quality = stats['quality_distribution'].get(content_type, 0)
        content_list = collection.get_by_type(content_type)
        
        total_errors = sum(len(c.validation_errors) for c in content_list)
        total_warnings = sum(len(c.validation_warnings) for c in content_list)
        
        validation_summary = f"{total_errors} errors, {total_warnings} warnings"
        
        table.add_row(
            content_type.title(),
            str(count),
            f"{avg_quality:.2f}",
            validation_summary
        )
    
    console.print(table)
    console.print()
    
    # Display total statistics
    console.print(f"[bold]Total Files Processed:[/bold] {stats['total_files']}")
    console.print(f"[bold]Total Validation Errors:[/bold] {stats['validation_errors']}")
    console.print(f"[bold]Total Validation Warnings:[/bold] {stats['validation_warnings']}")

def test_specific_parser(content_type: str, file_path: Path, content_dir: Path):
    """Test a specific parser with detailed output"""
    console.print(f"[cyan]🔍 Testing {content_type} parser with {file_path.name}[/cyan]")
    
    try:
        # Create parser
        parser = ParserFactory.create_parser(content_dir, content_type)
        
        # Parse file
        extracted = parser.parse_file(file_path)
        
        if extracted:
            # Display key extracted data
            display_extracted_data_summary(content_type, extracted)
            
        else:
            console.print(f"[red]❌ Failed to parse {file_path}[/red]")
    
    except Exception as e:
        console.print(f"[red]❌ Error testing {content_type} parser: {e}[/red]")
        import traceback
        traceback.print_exc()

def display_extracted_data_summary(content_type: str, extracted):
    """Display a summary of extracted data"""
    main_entity = extracted.main_entity
    
    # Create a panel with key information
    summary_content = []
    
    # Basic info
    title = main_entity.get('title', 'Untitled')
    summary_content.append(f"[bold]Title:[/bold] {title}")
    
    if content_type == 'resume':
        name = main_entity.get('full_name', 'Unknown')
        email = main_entity.get('email', 'Not provided')
        summary_content.extend([
            f"[bold]Name:[/bold] {name}",
            f"[bold]Email:[/bold] {email}",
            f"[bold]Education Records:[/bold] {len(extracted.metadata.get('education', []))}",
            f"[bold]Experience Records:[/bold] {len(extracted.metadata.get('experience', []))}",
            f"[bold]Publications:[/bold] {len(extracted.metadata.get('publications', []))}",
            f"[bold]Social Links:[/bold] {len(extracted.metadata.get('social_links', []))}"
        ])
    
    elif content_type == 'project':
        description = main_entity.get('description', 'No description')[:100]
        project_type = main_entity.get('project_type', 'Unknown')
        status = main_entity.get('status', 'Unknown')
        summary_content.extend([
            f"[bold]Type:[/bold] {project_type}",
            f"[bold]Status:[/bold] {status}",
            f"[bold]Description:[/bold] {description}...",
            f"[bold]Technologies:[/bold] {len(extracted.technologies)}",
            f"[bold]Images:[/bold] {len(extracted.images)}",
            f"[bold]Team Size:[/bold] {main_entity.get('team_size', 'Unknown')}"
        ])
    
    elif content_type == 'blog':
        word_count = main_entity.get('word_count', 0)
        reading_time = main_entity.get('reading_time_minutes', 0)
        content_type_blog = main_entity.get('content_type', 'Unknown')
        summary_content.extend([
            f"[bold]Content Type:[/bold] {content_type_blog}",
            f"[bold]Word Count:[/bold] {word_count}",
            f"[bold]Reading Time:[/bold] {reading_time} minutes",
            f"[bold]Categories:[/bold] {len(extracted.categories)}",
            f"[bold]Tags:[/bold] {len(extracted.tags)}",
            f"[bold]Technical Analysis:[/bold] {extracted.metadata.get('content_analysis', {}).get('technical_analysis', {}).get('complexity_level', 'Unknown')}"
        ])
    
    elif content_type == 'idea':
        category = main_entity.get('category', 'Unknown')
        feasibility = main_entity.get('feasibility_score', 0)
        impact = main_entity.get('impact_score', 0)
        stage = main_entity.get('development_stage', 'Unknown')
        summary_content.extend([
            f"[bold]Category:[/bold] {category}",
            f"[bold]Development Stage:[/bold] {stage}",
            f"[bold]Feasibility Score:[/bold] {feasibility}/10",
            f"[bold]Impact Score:[/bold] {impact}/10",
            f"[bold]Technologies:[/bold] {len(extracted.technologies)}",
            f"[bold]Collaboration Needed:[/bold] {main_entity.get('collaboration_needed', 'Unknown')}"
        ])
    
    # Quality metrics
    summary_content.extend([
        "",
        f"[bold]Extraction Quality:[/bold] {extracted.extraction_quality:.2f}",
        f"[bold]Validation Errors:[/bold] {len(extracted.validation_errors)}",
        f"[bold]Validation Warnings:[/bold] {len(extracted.validation_warnings)}"
    ])
    
    # Display panel
    panel_content = "\n".join(summary_content)
    panel = Panel(
        panel_content,
        title=f"{content_type.title()} Parser Results",
        border_style="green" if extracted.extraction_quality > 0.7 else "yellow"
    )
    console.print(panel)
    
    # Show validation issues if any
    if extracted.validation_errors or extracted.validation_warnings:
        issues_content = []
        
        if extracted.validation_errors:
            issues_content.append("[bold red]Errors:[/bold red]")
            for error in extracted.validation_errors:
                issues_content.append(f"  • {error}")
        
        if extracted.validation_warnings:
            if issues_content:
                issues_content.append("")
            issues_content.append("[bold yellow]Warnings:[/bold yellow]")
            for warning in extracted.validation_warnings:
                issues_content.append(f"  • {warning}")
        
        if issues_content:
            issues_panel = Panel(
                "\n".join(issues_content),
                title="Validation Issues",
                border_style="red" if extracted.validation_errors else "yellow"
            )
            console.print(issues_panel)
    
    console.print()

def analyze_quality_and_validation(collection: ParsedContentCollection):
    """Analyze quality and validation across all parsed content"""
    all_content = collection.get_all_content()
    
    if not all_content:
        console.print("[yellow]No content to analyze[/yellow]")
        return
    
    # Quality analysis
    quality_scores = [c.extraction_quality for c in all_content]
    avg_quality = sum(quality_scores) / len(quality_scores)
    min_quality = min(quality_scores)
    max_quality = max(quality_scores)
    
    console.print(f"[bold]Quality Analysis:[/bold]")
    console.print(f"  Average Quality: {avg_quality:.2f}")
    console.print(f"  Min Quality: {min_quality:.2f}")
    console.print(f"  Max Quality: {max_quality:.2f}")
    console.print()
    
    # Validation analysis
    total_errors = sum(len(c.validation_errors) for c in all_content)
    total_warnings = sum(len(c.validation_warnings) for c in all_content)
    
    console.print(f"[bold]Validation Analysis:[/bold]")
    console.print(f"  Total Errors: {total_errors}")
    console.print(f"  Total Warnings: {total_warnings}")
    console.print()
    
    # Show most common issues
    all_errors = []
    all_warnings = []
    
    for content in all_content:
        all_errors.extend(content.validation_errors)
        all_warnings.extend(content.validation_warnings)
    
    if all_errors:
        console.print("[bold red]Most Common Errors:[/bold red]")
        error_counts = {}
        for error in all_errors:
            error_counts[error] = error_counts.get(error, 0) + 1
        
        for error, count in sorted(error_counts.items(), key=lambda x: x[1], reverse=True)[:5]:
            console.print(f"  • {error} ({count} times)")
        console.print()
    
    if all_warnings:
        console.print("[bold yellow]Most Common Warnings:[/bold yellow]")
        warning_counts = {}
        for warning in all_warnings:
            warning_counts[warning] = warning_counts.get(warning, 0) + 1
        
        for warning, count in sorted(warning_counts.items(), key=lambda x: x[1], reverse=True)[:5]:
            console.print(f"  • {warning} ({count} times)")
        console.print()
    
    # Technology analysis
    all_technologies = []
    for content in all_content:
        all_technologies.extend([tech.get('technology_name', '') for tech in content.technologies])
    
    if all_technologies:
        tech_counts = {}
        for tech in all_technologies:
            if tech:
                tech_counts[tech] = tech_counts.get(tech, 0) + 1
        
        console.print("[bold]Most Common Technologies:[/bold]")
        for tech, count in sorted(tech_counts.items(), key=lambda x: x[1], reverse=True)[:10]:
            console.print(f"  • {tech} ({count} occurrences)")
        console.print()

def demonstrate_extracted_data():
    """Demonstrate the sophistication of extracted data"""
    console.print("[bold blue]🔍 Demonstrating Extracted Data Sophistication[/bold blue]")
    console.print()
    
    content_dir = Path("/Users/macbook.silan.tech/Documents/GitHub/AIPro-Resume/api-test-portfolio/content")
    
    # Parse a project file to show detailed extraction
    project_file = content_dir / 'projects' / 'ai-chatbot.md'
    if project_file.exists():
        parser = ParserFactory.create_parser(content_dir, 'project')
        extracted = parser.parse_file(project_file)
        
        if extracted:
            console.print("[bold]Sample Project Data Structure:[/bold]")
            
            # Show main entity
            console.print("\n[cyan]Main Entity (Project):[/cyan]")
            main_sample = {
                'title': extracted.main_entity.get('title'),
                'project_type': extracted.main_entity.get('project_type'),
                'status': extracted.main_entity.get('status'),
                'team_size': extracted.main_entity.get('team_size'),
                'github_url': extracted.main_entity.get('github_url'),
                'demo_url': extracted.main_entity.get('demo_url')
            }
            console.print(JSON(json.dumps(main_sample, indent=2)))
            
            # Show technologies
            if extracted.technologies:
                console.print("\n[cyan]Technologies (with categorization):[/cyan]")
                tech_sample = extracted.technologies[:3]  # Show first 3
                console.print(JSON(json.dumps(tech_sample, indent=2)))
            
            # Show project details
            if extracted.metadata.get('details'):
                console.print("\n[cyan]Project Details:[/cyan]")
                details_sample = extracted.metadata['details'][0] if extracted.metadata['details'] else {}
                limited_details = {
                    'goals': details_sample.get('goals', '')[:100] + '...' if details_sample.get('goals') else '',
                    'challenges': details_sample.get('challenges', '')[:100] + '...' if details_sample.get('challenges') else '',
                    'solutions': details_sample.get('solutions', '')[:100] + '...' if details_sample.get('solutions') else ''
                }
                console.print(JSON(json.dumps(limited_details, indent=2)))
            
            # Show performance metrics
            if extracted.metadata.get('metrics'):
                console.print("\n[cyan]Performance Metrics:[/cyan]")
                console.print(JSON(json.dumps(extracted.metadata['metrics'], indent=2)))
            
            console.print()

if __name__ == "__main__":
    try:
        # Run the comprehensive test
        success = test_parser_system()
        
        if success:
            # Demonstrate data sophistication
            demonstrate_extracted_data()
        
    except KeyboardInterrupt:
        console.print("\n[yellow]Testing interrupted by user[/yellow]")
    except Exception as e:
        console.print(f"\n[red]Unexpected error: {e}[/red]")
        import traceback
        traceback.print_exc()