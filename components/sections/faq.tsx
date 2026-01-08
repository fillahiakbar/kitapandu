import { FAQItem } from "@/components/ui/faq-item";
import { FAQS } from "@/data/faqs";
import { Button } from "@/components/ui/button";

export function FAQSection() {
  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="mb-6 text-[48px] font-bold leading-none">FAQs</h2>

            <p className="mb-10 max-w-sm text-sm leading-[1.8] text-gray-600">
              Explore A Wide Range Of Professional Courses Designed To Help You
              Grow, Learn, And Succeed.
            </p>

            <Button>Mulai Sekarang</Button>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="flex flex-col gap-6">
            {FAQS.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                defaultOpen={index === 1} // sesuai Figma (item ke-2 aktif)
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
