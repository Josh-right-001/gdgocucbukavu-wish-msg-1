
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { User, Palette, MessageSquare, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UserData {
  whatsapp: string;
  name: string;
  photo: string;
}

const SettingsTab = ({ userData }: { userData: UserData }) => {
  const [profile, setProfile] = useState({
    personalName: userData.name,
    communityName: userData.name,
    role: 'Website Developer',
    phone: userData.whatsapp
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    language: 'fr'
  });

  const [feedback, setFeedback] = useState('');
  const [stats] = useState({
    cardsCreated: 3,
    totalLikes: 247,
    totalShares: 18,
    totalComments: 34
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences d'affichage ont été sauvegardées",
    });
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) {
      toast({
        title: "Message requis",
        description: "Veuillez entrer votre message avant d'envoyer",
        variant: "destructive"
      });
      return;
    }

    // Simulation d'envoi au WhatsApp 0903045830
    toast({
      title: "Feedback envoyé !",
      description: "Votre message a été transmis à l'équipe GDG",
    });
    setFeedback('');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Paramètres</h2>
          <p className="text-muted-foreground">Gérez votre profil et vos préférences</p>
        </div>

        {/* Statistiques */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-google-blue" />
              Mes statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-google-blue/10 rounded-lg">
                <div className="text-2xl font-bold text-google-blue">{stats.cardsCreated}</div>
                <div className="text-sm text-muted-foreground">Cartes créées</div>
              </div>
              <div className="text-center p-4 bg-google-red/10 rounded-lg">
                <div className="text-2xl font-bold text-google-red">{stats.totalLikes}</div>
                <div className="text-sm text-muted-foreground">Likes reçus</div>
              </div>
              <div className="text-center p-4 bg-google-green/10 rounded-lg">
                <div className="text-2xl font-bold text-google-green">{stats.totalShares}</div>
                <div className="text-sm text-muted-foreground">Partages</div>
              </div>
              <div className="text-center p-4 bg-google-yellow/10 rounded-lg">
                <div className="text-2xl font-bold text-google-yellow">{stats.totalComments}</div>
                <div className="text-sm text-muted-foreground">Commentaires</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profil */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-google-green" />
              Mon profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="personalName">Nom personnel</Label>
                <Input
                  id="personalName"
                  value={profile.personalName}
                  onChange={(e) => setProfile(prev => ({ ...prev, personalName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="communityName">Nom dans la communauté</Label>
                <Input
                  id="communityName"
                  value={profile.communityName}
                  onChange={(e) => setProfile(prev => ({ ...prev, communityName: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Fonction</Label>
              <Select value={profile.role} onValueChange={(value) => setProfile(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website Developer">Website Developer</SelectItem>
                  <SelectItem value="Mobile Developer">Mobile Developer</SelectItem>
                  <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                  <SelectItem value="Flutter Lead">Flutter Lead</SelectItem>
                  <SelectItem value="Python Lead">Python Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Numéro WhatsApp</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-muted-foreground">
                Le numéro WhatsApp ne peut pas être modifié
              </p>
            </div>

            <Button onClick={handleSaveProfile} className="google-gradient hover:opacity-90">
              Sauvegarder le profil
            </Button>
          </CardContent>
        </Card>

        {/* Apparence */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-google-yellow" />
              Apparence et langue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Thème</Label>
              <Select value={appearance.theme} onValueChange={(value) => setAppearance(prev => ({ ...prev, theme: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="auto">Automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select value={appearance.language} onValueChange={(value) => setAppearance(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Kiswahili</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications pour les nouvelles cartes
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button onClick={handleSaveAppearance} variant="outline">
              Sauvegarder les préférences
            </Button>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-google-red" />
              Envoyer un feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Votre message</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Partagez vos suggestions, signaler un bug ou donnez votre avis..."
                rows={4}
              />
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Votre message sera automatiquement envoyé à l'équipe GDG Bukavu via WhatsApp
              </p>
            </div>

            <Button onClick={handleSendFeedback} className="google-gradient hover:opacity-90">
              Envoyer le feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTab;
