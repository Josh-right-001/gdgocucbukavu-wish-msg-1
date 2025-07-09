
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Bookmark, User, Trash2, Share2 } from 'lucide-react';

interface UserData {
  whatsapp: string;
  name: string;
  photo: string;
}

const ViewTab = ({ userData }: { userData: UserData }) => {
  const [myCards] = useState([
    {
      id: '1',
      name: 'Sarah M. Kamau',
      title: 'UI/UX Designer',
      date: '15 MARS',
      likes: 89,
      createdAt: '2024-07-09'
    }
  ]);

  const [likedCards] = useState([
    {
      id: '1',
      name: 'Josh R. Josias',
      title: 'Website Developer',
      date: '06 JULY',
      likes: 127,
      author: 'GDG Team'
    }
  ]);

  const [favoriteCards] = useState([
    {
      id: '1',
      name: 'Alex K. Muteba',
      title: 'Flutter Lead',
      date: '22 AUGUST',
      likes: 156,
      author: 'Mobile Team'
    }
  ]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Mes cartes</h2>
          <p className="text-muted-foreground">Gérez vos cartes créées, likées et favorites</p>
        </div>

        <Tabs defaultValue="created" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="created" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Créées ({myCards.length})
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Likées ({likedCards.length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Favoris ({favoriteCards.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created" className="space-y-4">
            {myCards.length === 0 ? (
              <Card className="text-center p-8">
                <p className="text-muted-foreground">Vous n'avez pas encore créé de cartes</p>
                <Button className="mt-4">Créer ma première carte</Button>
              </Card>
            ) : (
              myCards.map((card) => (
                <Card key={card.id} className="card-shadow hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{card.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{card.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{card.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {card.likes} likes
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Partager
                        </Button>
                        <Button variant="outline" size="sm">
                          Republier
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="liked" className="space-y-4">
            {likedCards.map((card) => (
              <Card key={card.id} className="card-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{card.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <p className="text-xs text-muted-foreground">Par {card.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{card.date}</p>
                      <p className="text-xs text-google-red flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current" />
                        {card.likes} likes
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {favoriteCards.map((card) => (
              <Card key={card.id} className="card-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{card.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <p className="text-xs text-muted-foreground">Par {card.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{card.date}</p>
                      <p className="text-xs text-google-yellow flex items-center gap-1">
                        <Bookmark className="w-3 h-3 fill-current" />
                        Favori
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ViewTab;
