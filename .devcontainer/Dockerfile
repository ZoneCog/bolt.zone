FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install system dependencies
RUN apt-get update && apt-get install -y \
    opam swipl julia python3 python3-pip

# Initialize OPAM for Coq
RUN opam init --disable-sandboxing \
    && eval $(opam env) \
    && opam install coq

# Install AGI tools and libraries
RUN pip3 install ReservoirPy jax flax pennylane

# Install Prolog (SWI-Prolog)
RUN apt-get install -y swi-prolog

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
