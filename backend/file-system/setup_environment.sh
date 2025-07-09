#!/bin/bash

# Silan Personal Website Generator - Environment Setup Script
# This script sets up the development environment for the Silan personal website generator

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_info() {
    print_color $BLUE "ℹ️  $1"
}

print_success() {
    print_color $GREEN "✅ $1"
}

print_warning() {
    print_color $YELLOW "⚠️  $1"
}

print_error() {
    print_color $RED "❌ $1"
}

# Check if Python is installed
check_python() {
    print_info "Checking Python installation..."
    
    if command -v python3 &> /dev/null; then
        python_version=$(python3 --version | cut -d' ' -f2)
        print_success "Python $python_version found"
        
        # Check if Python version is >= 3.8
        python3 -c "import sys; exit(0 if sys.version_info >= (3, 8) else 1)" 2>/dev/null
        if [ $? -eq 0 ]; then
            print_success "Python version is compatible (>= 3.8)"
        else
            print_error "Python 3.8 or higher is required. Found: $python_version"
            exit 1
        fi
    else
        print_error "Python 3 is not installed. Please install Python 3.8 or higher."
        print_info "Visit: https://www.python.org/downloads/"
        exit 1
    fi
}

# Check if pip is installed
check_pip() {
    print_info "Checking pip installation..."
    
    if command -v pip3 &> /dev/null; then
        pip_version=$(pip3 --version | cut -d' ' -f2)
        print_success "pip $pip_version found"
    else
        print_error "pip is not installed. Installing pip..."
        python3 -m ensurepip --upgrade
        print_success "pip installed successfully"
    fi
}

# Create virtual environment
create_venv() {
    print_info "Creating virtual environment..."
    
    if [ -d "venv" ]; then
        print_warning "Virtual environment already exists. Removing..."
        rm -rf venv
    fi
    
    python3 -m venv venv
    print_success "Virtual environment created"
}

# Activate virtual environment and install dependencies
install_dependencies() {
    print_info "Activating virtual environment and installing dependencies..."
    
    source venv/bin/activate
    
    # Upgrade pip
    pip install --upgrade pip
    
    # Install in development mode
    if [ -f "pyproject.toml" ]; then
        print_info "Installing from pyproject.toml..."
        pip install -e ".[dev,advanced]"
    elif [ -f "requirements.txt" ]; then
        print_info "Installing from requirements.txt..."
        pip install -r requirements.txt
        pip install -e .
    else
        print_error "No pyproject.toml or requirements.txt found!"
        exit 1
    fi
    
    print_success "Dependencies installed successfully"
}

# Verify installation
verify_installation() {
    print_info "Verifying installation..."
    
    source venv/bin/activate
    
    # Check if silan command is available
    if command -v silan &> /dev/null; then
        silan_version=$(silan --version 2>/dev/null || echo "unknown")
        print_success "Silan CLI installed successfully - $silan_version"
    else
        print_error "Silan CLI not found in PATH"
        exit 1
    fi
    
    # Test basic functionality
    print_info "Testing basic functionality..."
    silan --help > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_success "Basic functionality test passed"
    else
        print_error "Basic functionality test failed"
        exit 1
    fi
}

# Create example project
create_example() {
    print_info "Creating example project..."
    
    source venv/bin/activate
    
    # Create a test directory
    test_dir="example-website"
    if [ -d "$test_dir" ]; then
        print_warning "Example directory already exists. Removing..."
        rm -rf "$test_dir"
    fi
    
    mkdir -p "$test_dir"
    cd "$test_dir"
    
    # Initialize example project
    silan init my-website --template academic --theme default --language en
    
    if [ $? -eq 0 ]; then
        print_success "Example project created in $test_dir/my-website"
        print_info "To test the example:"
        print_info "  cd $test_dir/my-website"
        print_info "  source ../../venv/bin/activate"
        print_info "  silan dev"
    else
        print_error "Failed to create example project"
    fi
    
    cd ..
}

# Setup development tools
setup_dev_tools() {
    print_info "Setting up development tools..."
    
    source venv/bin/activate
    
    # Create pre-commit hook
    if command -v pre-commit &> /dev/null; then
        pre-commit install
        print_success "Pre-commit hooks installed"
    else
        print_warning "pre-commit not found, skipping hook installation"
    fi
    
    # Create useful scripts
    cat > run_tests.sh << 'EOF'
#!/bin/bash
source venv/bin/activate
python -m pytest tests/ -v
EOF
    chmod +x run_tests.sh
    
    cat > format_code.sh << 'EOF'
#!/bin/bash
source venv/bin/activate
black silan/
isort silan/
EOF
    chmod +x format_code.sh
    
    cat > lint_code.sh << 'EOF'
#!/bin/bash
source venv/bin/activate
flake8 silan/
mypy silan/
EOF
    chmod +x lint_code.sh
    
    print_success "Development tools configured"
}

# Print usage instructions
print_usage() {
    print_success "🎉 Environment setup completed successfully!"
    echo
    print_info "Quick Start:"
    echo "  1. Activate virtual environment: source venv/bin/activate"
    echo "  2. Create new website: silan init my-website"
    echo "  3. Start development: cd my-website && silan dev"
    echo
    print_info "Available commands:"
    echo "  silan --help           - Show all available commands"
    echo "  silan init <name>      - Create new website project"
    echo "  silan build            - Build static website"
    echo "  silan dev              - Start development server"
    echo "  silan validate         - Validate content files"
    echo "  silan status           - Show project status"
    echo
    print_info "Development scripts:"
    echo "  ./run_tests.sh         - Run test suite"
    echo "  ./format_code.sh       - Format code with black/isort"
    echo "  ./lint_code.sh         - Lint code with flake8/mypy"
    echo
    print_info "Example project created in: example-website/"
}

# Main execution
main() {
    print_success "🚀 Setting up Silan Personal Website Generator"
    echo
    
    check_python
    check_pip
    create_venv
    install_dependencies
    verify_installation
    create_example
    setup_dev_tools
    
    echo
    print_usage
}

# Run main function
main "$@"