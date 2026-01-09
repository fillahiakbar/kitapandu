import { FAQItem } from "@/components/ui/faq-item";
import { FAQS } from "@/data/faqs";
import { Button } from "@/components/ui/button";

export function FAQSection() {
  return (
    <section id="faq" className="py-8 md:py-28 cursor-default">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <h2 className="mb-6 text-[48px] font-bold leading-none">FAQs</h2>

            <p className="mx-auto mb-10 max-w-sm text-sm leading-[1.8] text-gray-600 md:mx-0">
              Explore A Wide Range Of Professional Courses Designed To Help You
              Grow, Learn, And Succeed.
            </p>

            <div className="flex justify-center md:justify-start">
              <Button>Mulai Sekarang</Button>
            </div>
          </div>

          {/* RIGHT ACCORDION */}
          {/* RIGHT ACCORDION */}
          <div className="mx-auto flex max-w-xl flex-col gap-6 md:mx-0">
            {FAQS.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                defaultOpen={index === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
