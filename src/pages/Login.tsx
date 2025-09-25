import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">MA</span>
            </div>
            <CardTitle className="text-2xl font-bold">Acesse sua conta</CardTitle>
            <CardDescription className="text-base">
              Entre com seu email e senha ou crie uma nova conta
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                      brandButtonText: 'white',
                      defaultButtonBackground: '#f8fafc',
                      defaultButtonBackgroundHover: '#f1f5f9',
                      inputBackground: 'white',
                      inputBorder: '#e2e8f0',
                      inputBorderHover: '#cbd5e1',
                      inputBorderFocus: '#2563eb',
                    },
                    space: {
                      buttonPadding: '12px 16px',
                      inputPadding: '12px 16px',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      buttonBorderRadius: '8px',
                      inputBorderRadius: '8px',
                    },
                  },
                },
                className: {
                  button: 'font-medium transition-all duration-200',
                  input: 'transition-all duration-200',
                  label: 'font-medium text-gray-700',
                  message: 'text-sm',
                }
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Entrar',
                    loading_button_label: 'Entrando...',
                    link_text: 'Já tem uma conta? Entre aqui',
                    password_input_placeholder: 'Digite sua senha',
                    email_input_placeholder: 'Digite seu email',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Criar conta',
                    loading_button_label: 'Criando conta...',
                    link_text: 'Não tem uma conta? Cadastre-se',
                    password_input_placeholder: 'Crie uma senha',
                    email_input_placeholder: 'Digite seu email',
                    confirmation_text: 'Verifique seu email para confirmar a conta',
                  },
                  forgotten_password: {
                    email_label: 'Email',
                    button_label: 'Recuperar senha',
                    loading_button_label: 'Enviando...',
                    link_text: 'Esqueceu sua senha?',
                    confirmation_text: 'Verifique seu email para o link de recuperação',
                  },
                }
              }}
              theme="light"
              providers={[]}
              redirectTo={window.location.origin}
            />
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Ao continuar, você concorda com nossos termos de uso
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;