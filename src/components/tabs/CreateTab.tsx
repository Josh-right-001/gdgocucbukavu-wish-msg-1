
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Camera, Wand2, Download, Share2, Send } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

interface UserData {
  whatsapp: string;
  name: string;
  photo: string;
}

const CreateTab = ({ userData }: { userData: UserData }) => {
  const [step, setStep] = useState<'verify' | 'form' | 'preview'>('verify');
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    customTitle: '',
    birthDate: undefined as Date | undefined,
    photo: '',
    wishMessage: '',
    keywords: ''
  });

  const titles = [
    'Website Developer',
    'Mobile Developer',
    'Software Dev',
    'Web Lead',
    'Flutter Lead',
    'Arduino Lead',
    'Python Lead',
    'Management',
    'Alumni Lead ⭐⭐⭐',
    'Android Lead',
    'Python Dev',
    'Java Dev',
    'NodeJs Dev',
    'Backend Developer',
    'Data Analyst',
    'Junior Dev',
    'UI/UX Designer'
  ];

  const handleVerifyWhatsApp = async () => {
    setIsVerifying(true);
    
    // Simulation de vérification
    setTimeout(() => {
      setIsVerifying(false);
      setStep('form');
      toast({
        title: "Vérification réussie !",
        description: "Votre numéro WhatsApp a été vérifié",
      });
    }, 2000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIWish = async () => {
    if (!formData.keywords.trim()) {
      toast({
        title: "Mots-clés requis",
        description: "Veuillez entrer quelques mots-clés pour générer le message",
        variant: "destructive"
      });
      return;
    }

    const aiWishes = [
      `Joyeux anniversaire ${formData.firstName} ! En tant que ${formData.title || formData.customTitle}, votre expertise en ${formData.keywords} inspire toute l'équipe. Que cette nouvelle année vous apporte encore plus de succès et d'innovations ! 🎉`,
      `Happy Birthday ${formData.firstName}! Votre passion pour ${formData.keywords} et votre rôle de ${formData.title || formData.customTitle} font de vous un membre précieux de GDG Bukavu. Profitez de votre journée spéciale ! ✨`,
      `Félicitations ${formData.firstName} pour cette nouvelle année ! Grâce à votre talent en ${formData.keywords}, vous contribuez grandement au succès de notre communauté. Que cette année soit remplie de défis passionnants ! 🚀`,
      `Joyeux anniversaire à notre formidable ${formData.title || formData.customTitle} ! Votre maîtrise de ${formData.keywords} et votre dévouement sont remarquables. Passez une excellente journée ${formData.firstName} ! 🎂`
    ];

    const randomWish = aiWishes[Math.floor(Math.random() * aiWishes.length)];
    setFormData(prev => ({ ...prev, wishMessage: randomWish }));
    
    toast({
      title: "Message généré !",
      description: "Un magnifique message a été créé par l'IA",
    });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.birthDate) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    setStep('preview');
  };

  const handleDownload = () => {
    toast({
      title: "Téléchargement",
      description: "Votre carte a été téléchargée en HD !",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Publié !",
      description: "Votre carte est maintenant visible dans le feed",
    });
  };

  if (step === 'verify') {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Card className="w-full max-w-md card-shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Vérification WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Votre numéro : <span className="font-bold">{userData.whatsapp}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Nous vérifions votre appartenance à la communauté GDG Bukavu
              </p>
            </div>
            <Button 
              onClick={handleVerifyWhatsApp}
              disabled={isVerifying}
              className="w-full google-gradient hover:opacity-90"
            >
              {isVerifying ? 'Vérification...' : 'Vérifier mon numéro'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'preview') {
    const birthDateStr = formData.birthDate 
      ? format(formData.birthDate, 'dd MMMM', { locale: fr }).toUpperCase()
      : '';

    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Prévisualisation</h2>
            <p className="text-muted-foreground">Voici votre carte d'anniversaire</p>
          </div>

          {/* Carte d'anniversaire */}
          <Card className="card-shadow">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-google-blue/10 via-google-green/10 to-google-yellow/10 rounded-xl p-8 overflow-hidden">
                {/* Confettis */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="confetti-piece"
                      style={{
                        left: `${5 + i * 8}%`,
                        top: `${5 + (i % 4) * 25}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* En-tête */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{birthDateStr.split(' ')[0] || '06'}</div>
                      <div className="text-lg font-medium">{birthDateStr.split(' ')[1] || 'JULY'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">#gdgbukavu</div>
                      <div className="text-sm">#BuildwithAI</div>
                    </div>
                  </div>

                  {/* Titre */}
                  <div className="text-center mb-6">
                    <h1 className="text-5xl font-bold mb-2">Happy</h1>
                    <h1 className="text-6xl font-bold text-transparent bg-clip-text google-gradient">
                      Birthday
                    </h1>
                  </div>

                  {/* Photo et infos */}
                  <div className="text-center mb-6">
                    {formData.photo ? (
                      <img 
                        src={formData.photo} 
                        alt={`${formData.firstName} ${formData.lastName}`}
                        className="w-40 h-48 object-cover rounded-xl mx-auto mb-4 border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-40 h-48 bg-gradient-to-br from-google-blue to-google-green rounded-xl mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-white text-5xl font-bold">
                          {formData.firstName[0]}{formData.lastName[0]}
                        </span>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold">{formData.firstName} {formData.lastName}</h2>
                    <p className="text-lg text-muted-foreground">
                      {formData.title || formData.customTitle}
                    </p>
                  </div>

                  {/* Message */}
                  {formData.wishMessage && (
                    <div className="bg-white/70 rounded-xl p-4 mb-6">
                      <p className="text-center">{formData.wishMessage}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">@gdgbukavu</div>
                    <div className="w-12 h-12 bg-gray-800 rounded text-white text-xs flex items-center justify-center">
                      QR
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger HD
            </Button>
            <Button onClick={handlePublish} variant="outline" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Publier
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Partager
            </Button>
            <Button variant="ghost" onClick={() => setStep('form')}>
              Modifier
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Créer une carte</h2>
          <p className="text-muted-foreground">Remplissez les informations pour créer une magnifique carte d'anniversaire</p>
        </div>

        <Card className="card-shadow">
          <CardContent className="p-6 space-y-6">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Titre */}
            <div className="space-y-2">
              <Label>Titre dans la communauté</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, title: value, customTitle: '' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un titre" />
                </SelectTrigger>
                <SelectContent>
                  {titles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Autre (personnalisé)</SelectItem>
                </SelectContent>
              </Select>
              
              {formData.title === 'custom' && (
                <Input
                  value={formData.customTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, customTitle: e.target.value }))}
                  placeholder="Entrez votre titre personnalisé"
                  className="mt-2"
                />
              )}
            </div>

            {/* Date de naissance */}
            <div className="space-y-2">
              <Label>Date de naissance</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.birthDate ? (
                      format(formData.birthDate, 'dd MMMM', { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.birthDate}
                    onSelect={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <Label htmlFor="photo">Photo (optionnel)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="flex-1"
                />
                <Camera className="w-5 h-5 text-muted-foreground" />
              </div>
              {formData.photo && (
                <img 
                  src={formData.photo} 
                  alt="Preview" 
                  className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
                />
              )}
            </div>

            {/* Mots-clés pour l'IA */}
            <div className="space-y-2">
              <Label htmlFor="keywords">Mots-clés pour l'IA</Label>
              <div className="flex space-x-2">
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="ex: leadership, innovation, code"
                  className="flex-1"
                />
                <Button onClick={generateAIWish} variant="outline" size="icon">
                  <Wand2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Message de souhait */}
            <div className="space-y-2">
              <Label htmlFor="wishMessage">Message de souhait</Label>
              <Textarea
                id="wishMessage"
                value={formData.wishMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, wishMessage: e.target.value }))}
                placeholder="Entrez votre message ou utilisez l'IA..."
                rows={4}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full google-gradient hover:opacity-90">
              Créer la carte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTab;
