import os
import zipfile
import shutil
import sys
from pathlib import Path

# This tells the script to run in the exact folder where the file/exe is located
if getattr(sys, 'frozen', False):
    # If running as a compiled .exe
    working_dir = Path(sys.executable).parent
else:
    # If running as a normal .py script
    working_dir = Path(__file__).resolve().parent

def process_archives():
    # Find all zip files in the current folder
    zip_files = list(working_dir.glob("*.zip"))
    
    if not zip_files:
        print("No ZIP files found in this folder.")
        return

    # Create the Master folders for uploading inside the current folder
    master_upload_dir = working_dir / "Upload_Ready"
    master_images_dir = master_upload_dir / "Images"
    master_json_dir = master_upload_dir / "JSONs"
    
    master_images_dir.mkdir(parents=True, exist_ok=True)
    master_json_dir.mkdir(parents=True, exist_ok=True)

    for zip_path in zip_files:
        print(f"Processing: {zip_path.name}")
        
        # Temporary folder to extract into
        extract_dir = working_dir / zip_path.stem
        
        # Extract the zip
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_dir)
        except Exception as e:
            print(f"  Error extracting {zip_path.name}: {e}")
            continue
            
        # Define the deep path where files are currently located
        deep_path = extract_dir / "galleries" / "general"
        
        if deep_path.exists():
            # Move files to the Master Upload folders
            for file_path in deep_path.iterdir():
                if file_path.is_file():
                    # Decide which master folder to put it in
                    if file_path.suffix.lower() == ".json":
                        dest_folder = master_json_dir
                    else:
                        dest_folder = master_images_dir

                    # Prevent overwriting files with the same name
                    dest_file_path = dest_folder / file_path.name
                    counter = 1
                    while dest_file_path.exists():
                        new_name = f"{file_path.stem}_{counter}{file_path.suffix}"
                        dest_file_path = dest_folder / new_name
                        counter += 1
                        
                    # Move the file to the master folder
                    shutil.move(str(file_path), str(dest_file_path))
            
            # Cleanup the temporary extracted folder
            try:
                shutil.rmtree(extract_dir)
                print(f"  Successfully processed and moved files from {zip_path.name}")
            except Exception as e:
                print(f"  Note: Could not delete temporary folder {extract_dir.name}: {e}")
        else:
            print(f"  Warning: Expected path 'galleries/general' not found in {zip_path.name}")
            try:
                shutil.rmtree(extract_dir)
            except:
                pass

if __name__ == "__main__":
    process_archives()
    print("\nAll done! Check the 'Upload_Ready' folder.")
    # This prevents the .exe window from closing instantly
    input("Press Enter to exit...")