const downloadCSV = (csvData, fileName = "report.csv") => {
  const blob = new Blob([csvData], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};


export default downloadCSV;