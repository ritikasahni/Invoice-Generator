
function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.remove();
  calculateInvoiceTotal(); // Optional: Recalculate total after deletion
}
function calculateRowTotal(input) {
  const row = input.parentElement.parentElement;
  const qty = row.children[1].querySelector("input").value;
  const price = row.children[2].querySelector("input").value;
  const total = qty * price;
  row.children[3].textContent = isNaN(total) ? 0 : total.toFixed(2);

  calculateInvoiceTotal();
}

function calculateInvoiceTotal() {
  let grandTotal = 0;
  document.querySelectorAll(".row-total").forEach(cell => {
    grandTotal += parseFloat(cell.textContent) || 0;
  });
  document.getElementById("grandTotal").textContent = `₹ ${grandTotal.toFixed(2)}`;
}



function updateEvents() {
    document.querySelectorAll(".price, .qty").forEach(input => {
        input.oninput = calculateTotal;
    });
}


function calculateTotal() {
    let total = 0;
    document.querySelectorAll("#invoiceBody tr").forEach(row => {
        const price = parseFloat(row.querySelector(".price").value) || 0;
        const qty = parseFloat(row.querySelector(".qty").value) || 0;
        const amount = price * qty;
        row.querySelector(".amount").textContent = amount.toFixed(2);
        total += amount;
    });
    document.getElementById("totalAmount").textContent = total.toFixed(2);
}

function downloadPDF() {
  const confirmDownload = confirm("🔍 Do you want to preview and download the invoice as a PDF?");
  if (!confirmDownload) return;

  calculateTotals(); // Ensure totals are up to date

  const invoice = document.getElementById("invoiceContent");

  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5], // Top, left, bottom, right
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0 // Avoid page cutoff due to scroll
    },
    jsPDF: {
      unit: 'in',
      format: 'a4', // Use full A4 size
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Allow multipage split
  };

  html2pdf().set(opt).from(invoice).save();
}
