import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  botMessage: z.string(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      botMessage: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // if bot message is provided, do not send the form
    if (values.botMessage.length > 0) {
      console.log('botMessage', values.botMessage);
      return;
    }

    const FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScOvDtnVWQT0QSv04R2DOh2I7iGawNRnVTLA7SbB50nRcGo3Q/formResponse';

    const formData = new FormData();
    formData.append('entry.664934376', values.name); // name
    formData.append('entry.829828971', values.email); // email
    formData.append('entry.829828966', values.message); // message

    await fetch(FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='botMessage'
          render={({ field }) => (
            <FormItem className='invisible size-0 !mt-0'>
              <FormLabel>Bot message</FormLabel>
              <FormControl>
                <Input placeholder='Enter your bot message' className='resize-y' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter your message' className='resize-y' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' size='lg'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
