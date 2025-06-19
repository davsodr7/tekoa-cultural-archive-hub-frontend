import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [features, setFeatures] = useState<any[]>([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/conteudos')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setFeatures(data))
      .catch(() => setErro(true));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden cultural-pattern">
        <div className="cultural-gradient absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-8 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              {t('home.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('home.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/explore">{t('home.explore_btn')}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/about">{t('home.learn_more')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              {t('explore.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mergulhe na rica tapeçaria das culturas indígenas brasileiras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {erro ? (
              <div className="col-span-3 text-center text-red-500">Imagens indisponíveis no momento.</div>
            ) : (
              features.map((feature, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="aspect-video relative overflow-hidden">
                    {feature.imageUrl ? (
                      <img
                        src={feature.imageUrl}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">Sem imagem</div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-primary">
                      {feature.title || 'Sem título'}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description || 'Sem descrição'}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Diversidade Cultural Brasileira
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              O Brasil abriga uma das maiores diversidades indígenas do mundo, com centenas de povos
              e línguas únicas que resistem e se fortalecem através dos séculos.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">305</div>
              <p className="text-muted-foreground">Povos Indígenas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">274</div>
              <p className="text-muted-foreground">Línguas Faladas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">733</div>
              <p className="text-muted-foreground">Terras Indígenas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">900k+</div>
              <p className="text-muted-foreground">População Indígena</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Junte-se à Nossa Comunidade
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Faça parte da preservação e valorização das culturas indígenas brasileiras.
              Compartilhe conhecimento e aprenda com outras pessoas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">{t('nav.register')}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/explore">{t('nav.explore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
