"use strict";
const PDFToolsSdk = require("@adobe/documentservices-pdftools-node-sdk");
const path = require("path");
const setCustomOptions = (htmlToPDFOperation) => {
    const pageLayout = new PDFToolsSdk.CreatePDF.options.PageLayout();
    pageLayout.setPageSize(8, 11.5);
    const htmlToPdfOptions = new PDFToolsSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
        .includesHeaderFooter(true)
        .withPageLayout(pageLayout)
        .build();
    htmlToPDFOperation.setOptions(htmlToPdfOptions);
};
async function create(zipPath, pdfOutName = "default.pdf") {
    let apiCredentialsPath = path.join(__dirname, "..", "adobe-credentials", "pdftools-api-credentials.json");
    const credentials = PDFToolsSdk.Credentials.serviceAccountCredentialsBuilder()
        .fromFile(apiCredentialsPath)
        .build();
    const clientConfig = PDFToolsSdk.ClientConfig.clientConfigBuilder()
        .withConnectTimeout(40000)
        .withReadTimeout(40000)
        .build();
    const executionContext = PDFToolsSdk.ExecutionContext.create(credentials, clientConfig);
    const htmlToPDFOperation = PDFToolsSdk.CreatePDF.Operation.createNew();
    const input = PDFToolsSdk.FileRef.createFromLocalFile(zipPath);
    htmlToPDFOperation.setInput(input);
    setCustomOptions(htmlToPDFOperation);
    const result = await htmlToPDFOperation.execute(executionContext);
    const pathOutput = path.join(__dirname, "..", "public", "notes", pdfOutName);
    result.saveAsFile(pathOutput);
}
module.exports = {
    create,
};
//# sourceMappingURL=CreatePDFService.js.map