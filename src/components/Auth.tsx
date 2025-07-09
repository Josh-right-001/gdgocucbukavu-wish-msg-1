
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, Camera, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AuthProps {
  onAuthSuccess: (userData: UserData) => void;
}

interface UserData {
  whatsapp: string;
  name: string;
  photo: string;
}

const Auth = ({ onAuthSuccess }: AuthProps) => {
  const [formData, setFormData] = useState({
    whatsapp: '',
    name: '',
    photo: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.whatsapp || !formData.name) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulation de vérification
    setTimeout(() => {
      setIsVerified(true);
      setTimeout(() => {
        onAuthSuccess(formData);
        toast({
          title: "Authentification réussie !",
          description: "Bienvenue dans la communauté GDG Bukavu",
        });
      }, 1500);
    }, 2000);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-google-blue/10 via-google-green/10 to-google-yellow/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-shadow animate-fadeInUp">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-google-green mx-auto mb-4 animate-bounce-slow" />
            <h2 className="text-2xl font-bold text-google-green mb-2">Vérifié !</h2>
            <p className="text-muted-foreground">
              Votre compte a été vérifié avec succès. Redirection en cours...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-google-blue/10 via-google-green/10 to-google-yellow/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-shadow animate-fadeInUp">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <img 
              src="/lovable-uploads/c1b206a2-e8a6-4d07-afb0-0497c807defb.png" 
              alt="GDG Bukavu Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Authentification</CardTitle>
          <CardDescription>
            Connectez-vous à la communauté GDG Bukavu
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Numéro WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+243 XXX XXX XXX"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="transition-all duration-200 focus:ring-2 focus:ring-google-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom connu dans la communauté
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom dans GDG"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="transition-all duration-200 focus:ring-2 focus:ring-google-green"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Photo (optionnel)
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="transition-all duration-200 focus:ring-2 focus:ring-google-yellow"
              />
              {formData.photo && (
                <div className="mt-2">
                  <img 
                    src={formData.photo} 
                    alt="Preview" 
                    className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-google-blue"
                  />
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Vérification en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>En vous connectant, vous acceptez de faire partie de la communauté GDG Bukavu</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
