
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UserData {
  whatsapp: string;
  name: string;
  photo: string;
}

interface BirthdayCard {
  id: string;
  name: string;
  title: string;
  date: string;
  message: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isFavorite: boolean;
  author: string;
}

const HomeTab = ({ userData }: { userData: UserData }) => {
  const [cards, setCards] = useState<BirthdayCard[]>([
    {
      id: '1',
      name: 'Josh R. Josias',
      title: 'Website Developer',
      date: '06 JULY',
      message: 'To our Website Dev and Help Lead, thank you for your dedication and leadership. Wishing you a fantastic year ahead! 🎉',
      image: '/lovable-uploads/290d6588-abe3-42a6-a5cd-d92e93f40df7.png',
      likes: 127,
      comments: 23,
      isLiked: false,
      isFavorite: false,
      author: 'GDG Team'
    },
    {
      id: '2',
      name: 'Sarah M. Kamau',
      title: 'UI/UX Designer',
      date: '15 MARCH',
      message: 'Happy Birthday to our amazing UI/UX Designer! Your creativity and vision inspire us all. Have a wonderful day! ✨',
      image: '',
      likes: 89,
      comments: 16,
      isLiked: true,
      isFavorite: false,
      author: 'Design Team'
    },
    {
      id: '3',
      name: 'Alex K. Muteba',
      title: 'Flutter Lead',
      date: '22 AUGUST',
      message: 'Celebrating our Flutter Lead today! Thank you for guiding our mobile development journey. Cheers to another amazing year! 🚀',
      image: '',
      likes: 156,
      comments: 31,
      isLiked: false,
      isFavorite: true,
      author: 'Mobile Team'
    }
  ]);

  // Auto-increment des likes
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prevCards => 
        prevCards.map(card => ({
          ...card,
          likes: card.likes + Math.floor(Math.random() * 3) + 1
        }))
      );
    }, 60000); // Toutes les minutes

    return () => clearInterval(interval);
  }, []);

  const handleLike = (cardId: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? {
              ...card,
              isLiked: !card.isLiked,
              likes: card.isLiked ? card.likes - 1 : card.likes + 1
            }
          : card
      )
    );
  };

  const handleFavorite = (cardId: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? { ...card, isFavorite: !card.isFavorite }
          : card
      )
    );
    
    toast({
      title: "Favori",
      description: "Carte ajoutée aux favoris !",
    });
  };

  const handleComment = (cardId: string) => {
    const comments = [
      "Joyeux anniversaire ! 🎉",
      "Happy Birthday! Hope you have a wonderful day! 🎂",
      "Félicitations pour cette nouvelle année ! 🎈",
      "Wishing you all the best! 🌟",
      "Amazing work, happy birthday! 💪"
    ];
    
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? { ...card, comments: card.comments + 1 }
          : card
      )
    );

    toast({
      title: "Commentaire IA",
      description: randomComment,
    });
  };

  const handleShare = async (card: BirthdayCard) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Joyeux anniversaire ${card.name}!`,
          text: card.message,
          url: window.location.href
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      toast({
        title: "Lien copié",
        description: "Le lien de la carte a été copié dans le presse-papiers",
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 google-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GDG</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">GDG Bukavu</h1>
              <p className="text-sm text-muted-foreground">Wish Messages</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{userData.name}</p>
            <p className="text-xs text-muted-foreground">Membre</p>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-6">
        {cards.map((card, index) => (
          <Card key={card.id} className={`card-shadow hover:shadow-lg transition-all duration-300 animate-fadeInUp`} style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-google-blue to-google-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {card.author.split(' ').map(w => w[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{card.author}</p>
                    <p className="text-sm text-muted-foreground">Il y a 2h</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Carte d'anniversaire */}
              <div className="relative bg-gradient-to-br from-google-blue/10 via-google-green/10 to-google-yellow/10 rounded-xl p-6 overflow-hidden">
                {/* Confettis décoratifs */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="confetti-piece"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${10 + (i % 3) * 30}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* En-tête avec date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{card.date.split(' ')[0]}</div>
                      <div className="text-sm font-medium">{card.date.split(' ')[1]}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">#gdgbukavu</span>
                      <br />
                      <span className="text-sm font-medium">#BuildwithAI</span>
                    </div>
                  </div>

                  {/* Titre Happy Birthday */}
                  <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold mb-2">Happy</h2>
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text google-gradient">
                      Birthday
                    </h2>
                  </div>

                  {/* Photo et informations */}
                  <div className="text-center mb-4">
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="w-32 h-40 object-cover rounded-lg mx-auto mb-3 border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-40 bg-gradient-to-br from-google-blue to-google-green rounded-lg mx-auto mb-3 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-white text-4xl font-bold">
                          {card.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold">{card.name}</h3>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                  </div>

                  {/* Message */}
                  <p className="text-center text-sm mb-4 bg-white/50 rounded-lg p-3">
                    {card.message}
                  </p>

                  {/* Footer avec QR code simulé */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 text-xs">
                      <span className="bg-google-blue text-white px-2 py-1 rounded">@gdgbukavu</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded text-white text-xs flex items-center justify-center">
                      QR
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(card.id)}
                    className={`flex items-center space-x-2 ${
                      card.isLiked ? 'text-google-red' : 'text-muted-foreground'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${card.isLiked ? 'fill-current' : ''}`} />
                    <span>{card.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleComment(card.id)}
                    className="flex items-center space-x-2 text-muted-foreground"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{card.comments}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(card)}
                    className="text-muted-foreground"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFavorite(card.id)}
                  className={`${
                    card.isFavorite ? 'text-google-yellow' : 'text-muted-foreground'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${card.isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeTab;
