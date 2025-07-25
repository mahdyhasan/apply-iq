import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BookOpen,
  Presentation,
  Download,
  Save,
  Eye,
  FileText,
  HelpCircle,
  Lightbulb,
  Target,
  Users,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
  Copy
} from "lucide-react";

interface GeneratedContent {
  id: string;
  type: "notes" | "mcqs" | "slides";
  topic: string;
  subject: string;
  tone: string;
  content: string;
  createdAt: string;
  saved: boolean;
}

interface MCQQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const mockContent: GeneratedContent[] = [
  {
    id: "1",
    type: "notes",
    topic: "Photosynthesis",
    subject: "Biology",
    tone: "conceptual",
    content: `# Photosynthesis: The Foundation of Life

## Introduction
Photosynthesis is the biological process by which plants convert light energy into chemical energy...

## Key Components
1. **Chloroplasts** - The cellular organelles where photosynthesis occurs
2. **Chlorophyll** - The green pigment that captures light energy
3. **Carbon Dioxide** - Raw material absorbed from the atmosphere
4. **Water** - Essential reactant absorbed through roots

## The Process
### Light-Dependent Reactions
- Occur in the thylakoid membranes
- Chlorophyll absorbs light energy
- Water molecules are split (photolysis)
- ATP and NADPH are produced

### Light-Independent Reactions (Calvin Cycle)
- Occur in the stroma
- CO₂ is fixed into organic molecules
- Uses ATP and NADPH from light reactions
- Produces glucose as the final product

## Significance
- Primary source of oxygen in Earth's atmosphere
- Foundation of most food chains
- Essential for life on Earth`,
    createdAt: "2024-01-15",
    saved: true
  },
  {
    id: "2",
    type: "mcqs",
    topic: "World War II",
    subject: "History",
    tone: "exam-focused",
    content: JSON.stringify([
      {
        question: "Which event is considered the beginning of World War II?",
        options: [
          "Attack on Pearl Harbor",
          "Invasion of Poland",
          "Battle of Britain",
          "D-Day Normandy landings"
        ],
        correct: 1,
        explanation: "Germany's invasion of Poland on September 1, 1939, prompted Britain and France to declare war on Germany, marking the official beginning of WWII in Europe."
      },
      {
        question: "What was the primary purpose of the Marshall Plan?",
        options: [
          "Military alliance against Soviet Union",
          "Economic recovery of post-war Europe",
          "Nuclear weapons development",
          "Establishment of United Nations"
        ],
        correct: 1,
        explanation: "The Marshall Plan was an American initiative to provide economic aid to Western Europe after WWII to help rebuild war-torn regions and prevent the spread of communism."
      }
    ]),
    createdAt: "2024-01-14",
    saved: true
  }
];

export default function EducatorTools() {
  const [activeTab, setActiveTab] = useState("generate");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("conceptual");
  const [contentType, setContentType] = useState("notes");
  const [gradeLevel, setGradeLevel] = useState("high-school");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>(mockContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!subject || !topic) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let content = "";
      
      if (contentType === "notes") {
        content = generateNotes(subject, topic, tone);
      } else if (contentType === "mcqs") {
        content = JSON.stringify(generateMCQs(subject, topic));
      } else if (contentType === "slides") {
        content = generateSlides(subject, topic, tone);
      }
      
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: contentType as "notes" | "mcqs" | "slides",
        topic,
        subject,
        tone,
        content,
        createdAt: new Date().toISOString().split('T')[0],
        saved: false
      };
      
      setGeneratedContent([newContent, ...generatedContent]);
      setSelectedContent(newContent);
      setIsGenerating(false);
      setActiveTab("preview");
    }, 3000);
  };

  const generateNotes = (subject: string, topic: string, tone: string) => {
    const toneStyles = {
      conceptual: "detailed explanations with real-world examples",
      "exam-focused": "key points, formulas, and exam tips",
      interactive: "engaging activities and discussion questions"
    };

    return `# ${topic} - ${subject}

## Overview
This ${tone} guide covers the essential concepts of ${topic} in ${subject}.

## Learning Objectives
By the end of this lesson, students will be able to:
- Understand the fundamental principles of ${topic}
- Apply key concepts to solve problems
- Explain the significance and applications
- Connect ${topic} to real-world scenarios

## Key Concepts

### Concept 1: Foundation
The fundamental understanding of ${topic} begins with recognizing its core principles. These principles form the foundation for all advanced topics in this area.

### Concept 2: Applications
${topic} has numerous practical applications that students encounter in daily life. Understanding these connections helps reinforce theoretical knowledge.

### Concept 3: Problem-Solving
Effective problem-solving in ${topic} requires a systematic approach. Students should follow these steps:
1. Identify the given information
2. Determine what needs to be found
3. Select appropriate methods or formulas
4. Execute the solution carefully
5. Verify the answer makes sense

## Summary
${topic} is a crucial component of ${subject} that provides the foundation for advanced study. The ${toneStyles[tone as keyof typeof toneStyles]} approach helps students build strong conceptual understanding.

## Review Questions
1. What are the main principles of ${topic}?
2. How does ${topic} apply to real-world situations?
3. What problem-solving strategies are most effective?

## Further Study
Students should practice applying these concepts through homework exercises and explore additional resources for deeper understanding.`;
  };

  const generateMCQs = (subject: string, topic: string): MCQQuestion[] => {
    return [
      {
        question: `What is the primary focus of ${topic} in ${subject}?`,
        options: [
          "Basic definitions and terminology",
          "Advanced theoretical applications",
          "Historical development only",
          "Practical problem-solving techniques"
        ],
        correct: 3,
        explanation: `${topic} in ${subject} primarily focuses on practical problem-solving techniques that students can apply to real-world situations.`
      },
      {
        question: `Which approach is most effective when studying ${topic}?`,
        options: [
          "Memorizing all formulas without understanding",
          "Understanding concepts before memorizing details",
          "Skipping theoretical background",
          "Only focusing on exam requirements"
        ],
        correct: 1,
        explanation: "Understanding fundamental concepts provides the foundation needed to apply knowledge effectively and solve complex problems."
      },
      {
        question: `How does ${topic} connect to other areas of ${subject}?`,
        options: [
          "It is completely independent",
          "It builds upon previous concepts",
          "It only relates to advanced topics",
          "It has no connections to other areas"
        ],
        correct: 1,
        explanation: `${topic} builds upon foundational concepts and connects to multiple areas within ${subject}, creating an integrated understanding.`
      }
    ];
  };

  const generateSlides = (subject: string, topic: string, tone: string) => {
    return `# ${topic}
*${subject} Presentation*

---

## Slide 1: Introduction
- Welcome to our study of ${topic}
- Key learning objectives for today
- Why ${topic} matters in ${subject}

---

## Slide 2: Background & Context
- Historical development of ${topic}
- Current relevance and applications
- Connection to previous lessons

---

## Slide 3: Core Concepts
- **Primary Principle**: Foundation of ${topic}
- **Key Components**: Essential elements
- **Relationships**: How concepts connect

---

## Slide 4: Practical Applications
- Real-world examples
- Industry applications
- Everyday relevance

---

## Slide 5: Problem-Solving Approach
- Step-by-step methodology
- Common pitfalls to avoid
- Best practices for success

---

## Slide 6: Summary & Review
- Key takeaways from today's lesson
- Important points to remember
- Preview of next topic

---

## Slide 7: Questions & Discussion
- Review questions for understanding
- Interactive discussion points
- Clarification of concepts`;
  };

  const saveContent = (contentId: string) => {
    setGeneratedContent(generatedContent.map(content => 
      content.id === contentId ? { ...content, saved: true } : content
    ));
  };

  const deleteContent = (contentId: string) => {
    setGeneratedContent(generatedContent.filter(content => content.id !== contentId));
    if (selectedContent?.id === contentId) {
      setSelectedContent(null);
    }
  };

  const exportContent = (content: GeneratedContent, format: string) => {
    // Simulate export functionality
    const blob = new Blob([content.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.topic}-${content.type}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderMCQs = (mcqContent: string) => {
    try {
      const questions: MCQQuestion[] = JSON.parse(mcqContent);
      return (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <Card key={idx} className="p-4">
              <h3 className="font-semibold mb-3">Question {idx + 1}: {q.question}</h3>
              <div className="space-y-2 mb-3">
                {q.options.map((option, optIdx) => (
                  <div key={optIdx} className={`p-2 rounded ${optIdx === q.correct ? 'bg-green-100 border border-green-300' : 'bg-gray-50'}`}>
                    <span className="font-medium">{String.fromCharCode(65 + optIdx)}.</span> {option}
                    {optIdx === q.correct && <Badge className="ml-2" variant="default">Correct</Badge>}
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
              </div>
            </Card>
          ))}
        </div>
      );
    } catch {
      return <p>Error rendering MCQs</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Educator Tools</h1>
          <p className="text-gray-600">AI-powered content generation for teachers and educators</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate Content</TabsTrigger>
            <TabsTrigger value="preview">Preview & Edit</TabsTrigger>
            <TabsTrigger value="library">Content Library</TabsTrigger>
          </TabsList>

          {/* Generate Content Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>AI Content Generator</span>
                </CardTitle>
                <CardDescription>
                  Generate notes, MCQs, and slide presentations for any topic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="e.g., Mathematics, History, Biology"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic/Chapter</Label>
                      <Input
                        id="topic"
                        placeholder="e.g., Photosynthesis, World War II, Calculus"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content-type">Content Type</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notes">Class Notes</SelectItem>
                          <SelectItem value="mcqs">MCQ Questions</SelectItem>
                          <SelectItem value="slides">Slide Presentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Teaching Style</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conceptual">Conceptual</SelectItem>
                          <SelectItem value="exam-focused">Exam-Focused</SelectItem>
                          <SelectItem value="interactive">Interactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade-level">Grade Level</Label>
                      <Select value={gradeLevel} onValueChange={setGradeLevel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elementary">Elementary</SelectItem>
                          <SelectItem value="middle-school">Middle School</SelectItem>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Additional Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="Any specific requirements, examples, or focus areas..."
                        value={additionalRequirements}
                        onChange={(e) => setAdditionalRequirements(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                {isGenerating && (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      Generating {contentType} for {topic}... This may take a few seconds.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                  </Button>
                  <Button 
                    onClick={handleGenerate}
                    disabled={!subject || !topic || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview & Edit Tab */}
          <TabsContent value="preview" className="space-y-6">
            {selectedContent ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {selectedContent.type === "notes" && <BookOpen className="h-5 w-5" />}
                        {selectedContent.type === "mcqs" && <HelpCircle className="h-5 w-5" />}
                        {selectedContent.type === "slides" && <PresentationChart className="h-5 w-5" />}
                        <span>{selectedContent.topic} - {selectedContent.type.toUpperCase()}</span>
                      </CardTitle>
                      <CardDescription>
                        {selectedContent.subject} | {selectedContent.tone} style | Created: {selectedContent.createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {!selectedContent.saved && (
                        <Button variant="outline" size="sm" onClick={() => saveContent(selectedContent.id)}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => exportContent(selectedContent, 'pdf')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportContent(selectedContent, 'docx')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export DOCX
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedContent.type === "mcqs" ? (
                    renderMCQs(selectedContent.content)
                  ) : (
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {selectedContent.content}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Content Selected</h3>
                  <p className="text-gray-600">Generate new content or select from your library to preview here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Content Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Content Library</span>
                </CardTitle>
                <CardDescription>
                  Manage your generated educational content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedContent.map((content) => (
                    <Card key={content.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" 
                          onClick={() => setSelectedContent(content)}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{content.topic}</h3>
                            <Badge variant="outline">{content.type.toUpperCase()}</Badge>
                            <Badge variant="secondary">{content.subject}</Badge>
                            {content.saved && (
                              <Badge variant="default">
                                <Save className="h-3 w-3 mr-1" />
                                Saved
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-gray-600 text-sm">
                            <span>Style: {content.tone}</span>
                            <span>Created: {content.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedContent(content);
                            setActiveTab("preview");
                          }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            exportContent(content, 'pdf');
                          }}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            deleteContent(content.id);
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
