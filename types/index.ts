// Type definitions for the application

export interface Service {
  num: string;
  title: string;
  body: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
}

export interface Project {
  id: string;
  tag: string;
  year: string;
  title: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
