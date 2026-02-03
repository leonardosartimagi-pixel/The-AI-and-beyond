'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Checkbox,
  Badge,
} from '@/components/ui';

export default function PreviewPage() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <header>
          <h1 className="text-primary">Design System Preview</h1>
          <p className="mt-2 text-gray-600">
            Component library for The AI and Beyond
          </p>
        </header>

        <ButtonsSection isLoading={isLoading} onLoadingClick={handleLoadingClick} />
        <BadgesSection />
        <CardsSection />
        <InputsSection
          inputValue={inputValue}
          onInputChange={setInputValue}
          textareaValue={textareaValue}
          onTextareaChange={setTextareaValue}
          isChecked={isChecked}
          onCheckedChange={setIsChecked}
        />
        <TypographySection />
      </div>
    </main>
  );
}

interface ButtonsSectionProps {
  isLoading: boolean;
  onLoadingClick: () => void;
}

function ButtonsSection({ isLoading, onLoadingClick }: ButtonsSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-primary">Buttons</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button isLoading={isLoading} onClick={onLoadingClick}>
            {isLoading ? 'Loading...' : 'Click for Loading'}
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </section>
  );
}

function BadgesSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-primary">Badges</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="solid">Solid</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary">Hero Keywords Example</h3>
        <div className="rounded-xl bg-primary p-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" size="lg">Consulenza AI</Badge>
            <Badge variant="secondary" size="lg">Sviluppo Web</Badge>
            <Badge variant="secondary" size="lg">Automazioni</Badge>
            <Badge variant="secondary" size="lg">Innovazione</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardsSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-primary">Cards</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-primary">Default Card</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is a default card with header, content, and footer sections.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card variant="interactive">
          <CardHeader>
            <h3 className="text-lg font-semibold text-primary">Interactive Card</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This card has hover effects. Try hovering over it!
            </p>
          </CardContent>
          <CardFooter>
            <Badge>Hover me</Badge>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

interface InputsSectionProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  textareaValue: string;
  onTextareaChange: (value: string) => void;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function InputsSection({
  inputValue,
  onInputChange,
  textareaValue,
  onTextareaChange,
  isChecked,
  onCheckedChange,
}: InputsSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-primary">Form Inputs</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Input
            label="Text Input"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
          />

          <Input
            label="Email Input"
            type="email"
            placeholder="email@example.com"
          />

          <Input
            label="With Error"
            placeholder="Invalid input"
            error="This field is required"
          />

          <Input
            label="Disabled"
            placeholder="Cannot edit"
            disabled
          />
        </div>

        <div className="space-y-4">
          <Textarea
            label="Textarea"
            placeholder="Write your message..."
            value={textareaValue}
            onChange={(e) => onTextareaChange(e.target.value)}
          />

          <Textarea
            label="Auto-resize Textarea"
            placeholder="This textarea grows..."
            autoResize
          />

          <Textarea
            label="With Error"
            placeholder="Invalid input"
            error="Please enter at least 10 characters"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-primary">Checkboxes</h3>
        <div className="space-y-3">
          <Checkbox
            label="I agree to the terms and conditions"
            checked={isChecked}
            onChange={(e) => onCheckedChange(e.target.checked)}
          />
          <Checkbox
            label="Subscribe to newsletter"
          />
          <Checkbox
            label="With error state"
            error="You must accept the terms"
          />
          <Checkbox
            label="Disabled checkbox"
            disabled
          />
        </div>
      </div>
    </section>
  );
}

function TypographySection() {
  return (
    <section className="space-y-6">
      <h2 className="text-primary">Typography</h2>

      <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-primary">Heading 1</h1>
        <h2 className="text-primary">Heading 2</h2>
        <h3 className="text-primary">Heading 3</h3>
        <h4 className="text-primary">Heading 4</h4>
        <h5 className="text-primary">Heading 5</h5>
        <h6 className="text-primary">Heading 6</h6>
        <p className="text-gray-600">
          This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
}
