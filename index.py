import os
import zipfile
import shutil
from pathlib import Path

# Setup paths (This automatically finds your Windows Desktop)
desktop_path = Path(os.path.join(os.path.expanduser("~"), "Desktop"))

def process_archives():
    # 1. Find all zip files on desktop
    zip_files = list(desktop_path.glob("*.zip"))
    
    if not zip_files:
        print("No ZIP files found on Desktop.")
        return

    for zip_path in zip_files:
        print(f"Processing: {zip_path.name}")
        
        # Create a folder named after the zip (minus the .zip extension)
        extract_dir = desktop_path / zip_path.stem
        
        # 2. Extract the folder
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_dir)
        except Exception as e:
            print(f"  Error extracting {zip_path.name}: {e}")
            continue
            
        # Define the deep path where files are currently located
        # folder -> galleries -> general
        deep_path = extract_dir / "galleries" / "general"
        
        if deep_path.exists():
            # Create the JSON folder at the top level
            json_folder = extract_dir / "JSON"
            json_folder.mkdir(parents=True, exist_ok=True) # Fixed the typo here
            
            # 3. Move files 2 levels up and sort JSONs
            for file_path in deep_path.iterdir():
                if file_path.is_file():
                    if file_path.suffix.lower() == ".json":
                        # Move to JSON folder
                        shutil.move(str(file_path), str(json_folder / file_path.name))
                    else:
                        # Move to the root of the extracted folder
                        shutil.move(str(file_path), str(extract_dir / file_path.name))
            
            # 4. Cleanup empty 'galleries' folder
            try:
                shutil.rmtree(extract_dir / "galleries")
                print(f"  Successfully processed {zip_path.name}")
            except Exception as e:
                print(f"  Note: Could not delete galleries folder: {e}")
        else:
            print(f"  Warning: Expected path 'galleries/general' not found in {zip_path.name}")

if __name__ == "__main__":
    process_archives()
    print("\nAll done!")
