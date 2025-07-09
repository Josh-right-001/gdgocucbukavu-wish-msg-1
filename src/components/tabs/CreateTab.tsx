
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Camera, Wand2, Download, Share2, Send, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';
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
      `To our ${formData.title || formData.customTitle}, ${formData.firstName}, thank you for your dedication and leadership in ${formData.keywords}. Wishing you a fantastic year ahead! 🎉`,
      `Happy Birthday ${formData.firstName}! Your expertise in ${formData.keywords} and your role as ${formData.title || formData.customTitle} inspire our entire community. Have an amazing day! ✨`,
      `Celebrating ${formData.firstName} today! Your passion for ${formData.keywords} and commitment as our ${formData.title || formData.customTitle} make you invaluable to GDG Bukavu. Enjoy your special day! 🚀`,
      `To our amazing ${formData.title || formData.customTitle}, ${formData.firstName}! Your mastery of ${formData.keywords} and dedication to our community are remarkable. Have a wonderful birthday! 🎂`
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
            <p className="text-muted-foreground">Voici votre carte d'anniversaire professionnelle</p>
          </div>

          {/* Carte d'anniversaire professionnelle */}
          <Card className="card-shadow bg-white max-w-lg mx-auto">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 overflow-hidden min-h-[600px]">
                {/* Texture de fond subtile */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000" fill-opacity="0.1"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3C/g%3E%3C/svg%3E')]"></div>
                </div>

                {/* Confettis multicolores dispersés */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full opacity-60"
                      style={{
                        background: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'][i % 4],
                        left: `${10 + (i * 7) % 80}%`,
                        top: `${5 + (i * 11) % 85}%`,
                        transform: `rotate(${i * 30}deg)`,
                      }}
                    />
                  ))}
                </div>

                {/* Trois cercles colorés en haut à gauche */}
                <div className="absolute -top-4 -left-4 flex space-x-1">
                  <div className="w-8 h-8 bg-google-yellow rounded-full"></div>
                  <div className="w-8 h-8 bg-google-red rounded-full"></div>
                  <div className="w-8 h-8 bg-google-green rounded-full"></div>
                </div>

                {/* Hashtags en haut à droite */}
                <div className="absolute top-4 right-4 text-right text-xs text-gray-600 font-light">
                  <div className="font-mono">#gdgoucub</div>
                  <div className="font-mono">#BuildwithAI</div>
                </div>

                {/* Happy Birthday centré */}
                <div className="text-center mb-6 mt-8">
                  <h1 className="text-5xl font-bold text-black mb-2" style={{ fontFamily: 'cursive' }}>
                    Happy Birthday
                  </h1>
                </div>

                {/* Date sur le côté gauche */}
                <div className="absolute left-4 top-32 text-center">
                  <div className="text-4xl font-black text-black">
                    {birthDateStr.split(' ')[0] || '06'}
                  </div>
                  <div className="text-sm font-bold text-black tracking-wider">
                    {birthDateStr.split(' ')[1] || 'JULY'}
                  </div>
                </div>

                {/* Photo centrale dans un cadre Polaroid */}
                <div className="flex justify-center mb-6 mt-4">
                  <div className="bg-white p-3 rounded-lg shadow-lg transform rotate-1">
                    {formData.photo ? (
                      <img 
                        src={formData.photo} 
                        alt={`${formData.firstName} ${formData.lastName}`}
                        className="w-32 h-40 object-cover rounded"
                      />
                    ) : (
                      <div className="w-32 h-40 bg-gray-100 rounded flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Camera className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-xs">Photo</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nom et titre */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-black mb-1">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-lg text-gray-700 font-medium">
                    {formData.title || formData.customTitle}
                  </p>
                </div>

                {/* Message de remerciement */}
                {formData.wishMessage && (
                  <div className="text-center mb-8 px-4">
                    <p className="text-sm text-gray-800 leading-relaxed italic">
                      {formData.wishMessage}
                    </p>
                  </div>
                )}

                {/* Pied de page */}
                <div className="absolute bottom-4 left-4 right-4">
                  {/* Ligne multicolore */}
                  <div className="h-1 mb-4 rounded-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"></div>
                  
                  <div className="flex items-center justify-between">
                    {/* Icônes et handle */}
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <Linkedin className="w-4 h-4 text-black" />
                        <Twitter className="w-4 h-4 text-black" />
                        <Instagram className="w-4 h-4 text-black" />
                        <Youtube className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-xs text-black font-mono">@gdgoucubukavu</span>
                    </div>
                    
                    {/* QR Code */}
                    <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
                      <div className="text-white text-xs font-bold">QR</div>
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
                  placeholder="Josh"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Josias"
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
