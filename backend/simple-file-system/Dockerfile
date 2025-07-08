FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js for deployment tools (optional)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Copy requirements first for better caching
COPY pyproject.toml .
RUN pip install --no-cache-dir -e .

# Copy application code
COPY . .

# Install the CLI tool
RUN pip install -e .

# Create directories for content
RUN mkdir -p /app/content /app/themes /app/dist

# Set environment variables
ENV PYTHONPATH=/app
ENV CLI_MODE=docker

EXPOSE 3000

# Default command
CMD ["silan", "--help"]