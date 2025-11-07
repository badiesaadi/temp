import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, BookOpen, Heart, Baby, Brain, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  icon: any;
}

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Hypertension',
      category: 'Cardiology',
      icon: Heart,
      content: 'Hypertension (high blood pressure) is a common condition that can lead to serious complications. Regular monitoring, medication compliance, and lifestyle changes including reduced salt intake, regular exercise, and stress management are crucial for managing this condition.',
    },
    {
      id: '2',
      title: 'Prenatal Care Guidelines',
      category: 'Maternity',
      icon: Baby,
      content: 'Prenatal care is essential for healthy pregnancy outcomes. Schedule regular checkups, take prenatal vitamins with folic acid, avoid alcohol and smoking, maintain a balanced diet, and report any unusual symptoms to your healthcare provider immediately.',
    },
    {
      id: '3',
      title: 'Mental Health Awareness',
      category: 'Mental Health',
      icon: Brain,
      content: 'Mental health is as important as physical health. Depression, anxiety, and stress are treatable conditions. Seek professional help if you experience persistent sadness, changes in sleep or appetite, or difficulty concentrating. Support groups and therapy are effective treatments.',
    },
    {
      id: '4',
      title: 'Vaccination Schedule for Children',
      category: 'Pediatrics',
      icon: Shield,
      content: 'Vaccines protect children from serious diseases. Follow the national vaccination schedule: BCG at birth, DTP at 2-4-6 months, MMR at 12 months, and booster shots as recommended. Keep vaccination records updated and consult your pediatrician for any concerns.',
    },
    {
      id: '5',
      title: 'Cancer Prevention Tips',
      category: 'Oncology',
      icon: BookOpen,
      content: 'Reduce cancer risk through healthy lifestyle choices: avoid tobacco, maintain healthy weight, exercise regularly, eat plenty of fruits and vegetables, limit alcohol, protect skin from sun exposure, get vaccinated (HPV, Hepatitis B), and attend regular screening appointments.',
    },
  ];

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book appointments through the mobile app or by calling the hospital directly. Online booking shows real-time availability and sends confirmation reminders.',
    },
    {
      question: 'What documents do I need for hospital admission?',
      answer: 'Bring your national ID card, insurance card (if applicable), previous medical records, and any referral letters from your doctor.',
    },
    {
      question: 'How can I access my medical records?',
      answer: 'Medical records are digitized and accessible through the patient mobile app. You can view your history, download reports, and share them with your healthcare providers.',
    },
    {
      question: 'What should I do in case of emergency?',
      answer: 'For medical emergencies, call 14 or go directly to the nearest emergency department. Emergency services operate 24/7 and prioritize critical cases.',
    },
    {
      question: 'How do I find a specialist?',
      answer: 'Use the Specialist Search feature in the app to find doctors by specialty, location, and availability. You can view their profiles, ratings, and book appointments.',
    },
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="Help Center" />
      
      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Education & Support</h1>
          <p className="text-muted-foreground">Learn about health conditions and get answers to common questions</p>
        </div>

        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <section>
          <h2 className="text-2xl font-bold mb-4">Health Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map(article => {
              const Icon = article.icon;
              return (
                <Card key={article.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{article.title}</h3>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{article.content}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-bold text-lg mb-2">Need More Help?</h3>
          <p className="text-muted-foreground mb-4">
            If you can't find the answer you're looking for, try our AI-powered chatbot or contact support.
          </p>
          <div className="flex gap-2">
            <a href="/chat">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Chat with AI Assistant
              </button>
            </a>
          </div>
        </Card>
      </main>
    </div>
  );
}
