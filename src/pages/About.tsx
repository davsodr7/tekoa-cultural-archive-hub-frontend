import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import ImageWithFallback from '@/components/ImageWithFallback';

export const About: React.FC = () => {
  const { t } = useTranslation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const aboutImgUrl = `${backendUrl}/assets/img-about.jpg`;

  const values = [
    {
      title: "Respeito",
      description: "Abordamos todo conteúdo cultural com profundo respeito e reverência, honrando as tradições sagradas e conhecimentos dos povos indígenas brasileiros."
    },
    {
      title: "Preservação",
      description: "Nossa plataforma serve como um repositório digital para o patrimônio cultural, garantindo que tradições e conhecimentos sejam preservados para as futuras gerações."
    },
    {
      title: "Educação",
      description: "Promovemos o entendimento intercultural através da educação, fomentando o diálogo e valorização entre diferentes comunidades."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted/30 cultural-pattern py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Sobre o {t('home.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              Uma plataforma dedicada à preservação, compartilhamento e valorização das culturas indígenas brasileiras
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">{t('about.mission.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('about.mission.1')}
                </p>
                <p className="text-muted-foreground mb-4">
                  {t('about.mission.2')}
                </p>
                <p className="text-muted-foreground">
                  {t('about.mission.3')}
                </p>
              </div>
              <Card className="overflow-hidden aspect-square">
                <CardContent className="p-0 h-full">
                  <div className="aspect-square">
                    <ImageWithFallback
                      src={aboutImgUrl}
                      fallbackSrc="/placeholder.svg"
                      alt="Comunidade indígena brasileira"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-primary">{value.title}</h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Brazilian Context */}
            <div className="bg-muted/30 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary text-center">Diversidade Indígena Brasileira</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">305</div>
                  <p className="text-muted-foreground">Povos Indígenas</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">274</div>
                  <p className="text-muted-foreground">Línguas Faladas</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">733</div>
                  <p className="text-muted-foreground">Terras Indígenas</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">900k+</div>
                  <p className="text-muted-foreground">População Indígena</p>
                </div>
              </div>
            </div>

            {/* Community Focus */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-primary">Nossa Comunidade</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                O Tekoá Conectada reúne membros de comunidades indígenas, educadores, pesquisadores
                e pessoas interessadas em conhecer e valorizar a cultura indígena brasileira.
                Juntos, criamos um espaço respeitoso para intercâmbio cultural e aprendizado,
                garantindo que as vozes indígenas permaneçam no centro de nossa missão.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
