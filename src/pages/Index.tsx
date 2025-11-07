const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            MedOptima Healthcare Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            National Connected Healthcare Platform for Algeria
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a 
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2"
            >
              Hospital Dashboard
            </a>
            <a
              href="/government"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2"
            >
              Ministry Portal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
