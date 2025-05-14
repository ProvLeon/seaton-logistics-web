# 3D Model Files for Seaton Logistics

This directory contains 3D model files used throughout the Seaton Logistics website.

## Required Models

- `logistics-truck.glb` - Main logistics truck model that supports animations
  - Should include: cabin, body, wheels, and cargo container as separate objects
  - Optional animations: idle, drive, bounce

## Model Specifications

For the truck model to work properly with our animations:
- Model should be centered at origin
- Forward direction should be along -Z axis
- Main parts should have named objects:
  - "Body" or "TruckBody"
  - "Cabin"
  - "Wheels" (can be individual or grouped)
  - "Cargo" or "Container"

## Resources for Models

If you need to create or obtain a logistics truck model:

1. Use modeling software like Blender
2. Download from sources like:
   - Sketchfab (ensure proper licensing)
   - TurboSquid (ensure proper licensing)
   - Free3D
   - CGTrader

## Format Requirements

- Primary format: .glb (preferred)
- Secondary format: .gltf with textures
- Max triangle count: ~50,000 for optimal performance
- Textures should be optimized for web (1024x1024 or 2048x2048)