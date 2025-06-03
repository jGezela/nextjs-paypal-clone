import SendMoneyForm from "@/components/forms/sendMoneyForm";

export default function SendMoneyPage() {
  return (
    <section className="w-full">
      <header className="mb-5 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Send money</h1>
      </header>
      <div className="max-w-[512px]">
        <SendMoneyForm />
      </div>
    </section>
  );
}
