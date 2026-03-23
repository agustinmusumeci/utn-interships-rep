import companyService from "../services/company.service";
import internshipService from "../services/internship.service";

export class UploadController {
  async uploadData() {
    const rawData = await internshipService.scrapeInternships();

    const internships = [];
    const companiesHash = new Set();

    for (let i = 0; i < rawData?.internships?.length; i++) {
      const internship = rawData?.internships[i];
      const companyId = internship?.company_id;

      internships.push(internship);

      companiesHash.add(companyId);
    }

    const companies = [...companiesHash].map((c) => ({
      id: c,
      name: c,
    }));

    console.log("Updated data succesfully");
  }
}
