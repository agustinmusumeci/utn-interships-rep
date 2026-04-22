import { CompanyService } from "@/services/company.service";
import { InternshipService } from "@/services/internship.service";

export class UploadController {
  async uploadData() {
    try {
      const companyService = new CompanyService();
      const internshipService = new InternshipService();

      const rawData = await internshipService.scrapeInternships();

      const internships = [];
      const companiesHash = new Set();

      for (let i = 0; i < rawData?.length; i++) {
        const internship = rawData[i];
        const companyId = internship?.company_id;

        internships.push({
          ...internship,
          careers: internship?.careers || [],
        });

        companiesHash.add(companyId);
      }

      const companies = [...companiesHash].map((c) => ({
        id: String(c),
        name: String(c),
      }));

      await companyService.uploadCompanies(companies);
      const newInternships = await internshipService.uploadInternships(internships);

      console.log("Updated data succesfully", newInternships);

      return { internships: newInternships, companies: companies };
    } catch (e) {
      console.log(e);
      return { internships: [], companies: [] };
    }
  }
}
