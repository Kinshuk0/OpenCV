import pandas as pd
import math
from IPython.display import HTML

# Path to your files
input_csv_path = '/content/KartiFinalSheet.csv'
sample_file_path = '/content/formatting.csv'
num_files = 41

def style_dataframe(df):
    """Apply styling to the dataframe"""
    return df.style.set_properties(**{
        'font-family': 'Georgia',
        'min-width': '250px'
    }).set_table_styles([
        {'selector': 'th',
         'props': [
             ('background-color', '#8E7DC3'),
             ('font-weight', 'bold'),
             ('border', '1px solid black'),
             ('font-family', 'Georgia'),
             ('color', 'white')
         ]},
        {'selector': 'td',
         'props': [
             ('font-family', 'Georgia')
         ]}
    ])

try:
    # Read the sample file and input data
    sample_df = pd.read_csv(sample_file_path)
    input_df = pd.read_csv(input_csv_path)
    print(f"Successfully loaded input file. Total entries: {len(input_df)}")
    print(f"Sample file columns: {list(sample_df.columns)}")

    # Calculate rows per file
    rows_per_file = math.ceil(len(input_df) / num_files)

    # Iterate and create smaller files
    for i in range(num_files):
        start_row = i * rows_per_file
        end_row = min((i + 1) * rows_per_file, len(input_df))

        # Get chunk of input data
        chunk_df = input_df.iloc[start_row:end_row].copy()
        
        # Create new dataframe with sample structure
        output_df = pd.DataFrame(columns=sample_df.columns)
        
        # Copy matching columns from chunk to output
        for col in chunk_df.columns:
            if col in output_df.columns:
                output_df[col] = chunk_df[col]

        # Define output path
        output_xlsx_path = f'/content/drive/MyDrive/Colab Notebooks/ChunksOfMaster/output_file_{i+1}.xlsx'

        # Save styled version as Excel
        styled_df = style_dataframe(output_df)
        styled_df.to_excel(output_xlsx_path, engine='openpyxl', index=False)
        
        print(f"Created '{output_xlsx_path}' with {len(output_df)} entries and styling.")

except FileNotFoundError as e:
    print(f"Error: File not found - {e}")
except Exception as e:
    print(f"An error occurred: {e}")