import { ContactForm } from '@/components/app/contact-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='max-w-[500px] mx-auto py-16'>
      <div>
        <div className='py-6'>
          <h2 className='text-2xl font-semibold'>Say Hello</h2>
          <p className='text-muted-foreground text-sm mt-1.5'>We'd love to hear from you!</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
