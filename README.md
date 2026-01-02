# Medicine Expiry & Demand Checker

## Project Overview

The **Medicine Expiry & Demand Checker** is a web-based application designed to help pharmacists, retailers, and healthcare professionals monitor medicine expiry dates and predict upcoming demand. This tool:

- Checks if a medicine is **Safe**, **Near Expiry**, or **Expired**.  
- Suggests **offers** for near-expiry medicines to minimize losses.  
- Estimates **predicted demand for the next 7 days** based on daily sales.  
- Provides a **searchable medicine list** for quick access.  

The application is **user-friendly, professional, and visually appealing** with a centered widget and background design.

---

## Features

- **Search bar** to enter medicine names.  
- **Clickable medicine list** for quick selection.  
- **Toggleable result card**: shows medicine info, hides/reappears on click.  
- **Color-coded status**:
  - **Green**: Safe  
  - **Orange**: Near Expiry  
  - **Red**: Expired  
- **Near Expiry Offers**: displays promotional offer automatically.  
- **Predicted Demand**: calculates demand for next 7 days based on historical daily sales.  
- **Responsive Design**: centered widget with attractive background image.

---

## Medicine Dataset

The project includes **30 sample medicines** with the following details:

| Medicine Name        | Expiry Date | Daily Sales |
|---------------------|------------|------------|
| Paracetamol         | 01/03/2026 | 20         |
| Ibuprofen           | 15/01/2026 | 15         |
| Cough Syrup         | 20/12/2025 | 10         |
| Vitamin C           | 10/02/2026 | 25         |
| Amoxicillin         | 31/12/2025 | 12         |
| Cetirizine          | 25/01/2026 | 18         |
| Metformin           | 05/04/2026 | 30         |
| Omeprazole          | 28/02/2026 | 22         |
| Azithromycin        | 15/12/2025 | 8          |
| Diclofenac          | 15/03/2026 | 16         |
| Loratadine          | 05/01/2026 | 14         |
| Paracetamol Extra   | 12/03/2026 | 18         |
| Vitamin D           | 20/02/2026 | 22         |
| Aspirin             | 01/01/2026 | 10         |
| Ibuprofen Plus      | 28/02/2026 | 15         |
| Omeprazole Max      | 15/03/2026 | 12         |
| Cough Syrup Plus    | 10/12/2025 | 8          |
| Azithromycin Max    | 30/12/2025 | 9          |
| Diclofenac Extra    | 05/03/2026 | 16         |
| Metformin XR        | 20/04/2026 | 25         |
| Ranitidine          | 12/01/2026 | 14         |
| Salbutamol          | 18/03/2026 | 19         |
| Prednisolone        | 05/02/2026 | 13         |
| Levocetirizine      | 28/01/2026 | 17         |
| Pantoprazole        | 15/03/2026 | 20         |
| Fexofenadine        | 05/04/2026 | 22         |
| Amoxicillin XR      | 30/12/2025 | 11         |
| Doxycycline         | 10/02/2026 | 18         |
| Hydrochlorothiazide  | 25/01/2026 | 15         |
| Levothyroxine       | 15/03/2026 | 20         |

---

## Tech Stack

- **Frontend / UI**: HTML, CSS, JavaScript  
- **Fonts**: Google Fonts (Roboto)  
- **Dynamic UI & Logic**: Vanilla JavaScript  
- **Data**: Static sample medicines dataset  
- **Design**: Professional centered widget with semi-transparent overlay  

> The app runs entirely in the browser; no backend is required for this prototype.

---

## Usage Instructions

1. Open `index.html` in a web browser.  
2. Enter a **medicine name** in the search bar or click on a medicine from the list.  
3. Click **Check** to display:  
   - Expiry status (Safe / Near Expiry / Expired)  
   - Predicted demand for the next 7 days  
   - Offers for near-expiry medicines  
4. Click on the displayed medicine card to hide it.  
5. Focus back on the search bar to re-display the medicine list.

---

## Assumptions

- Daily sales are fixed and provided for each medicine.  
- Expiry dates are in `dd/mm/yyyy` format.  
- “Near Expiry” is defined as **less than 30 days** from the current date.  
- Offers are automatically generated for near expiry medicines.  

---

## Future Improvements

- Connect to **real-time medicine database** for live stock and expiry updates.  
- Add **sorting & filtering** based on expiry date or demand.  
- Integrate **notifications** for medicines about to expire.  
- Build **backend API** for multi-user access and persistent data storage.

---

