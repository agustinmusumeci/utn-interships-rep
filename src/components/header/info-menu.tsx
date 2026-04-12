import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function InfoMenu() {
  return (
    <div className="relative">
      <Accordion
        type="single"
        collapsible
        className="relative"
      >
        <AccordionItem value="info">
          <AccordionTrigger className="p-0 gap-2">
            <span className="nav-link">Información</span>
          </AccordionTrigger>
          <AccordionContent className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-border bg-neutral p-2 shadow-lg">
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href="/about"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-light-neutral hover:text-primary-hover! transition-all"
                >
                  Acerca de
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-light-neutral hover:text-primary-hover! transition-all"
                >
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
