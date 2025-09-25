import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showError, showSuccess } from '@/utils/toast';
import Navbar from '@/components/Navbar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

interface ProfileData {
  full_name: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, phone, address')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Erro ao buscar perfil:', error);
        } else if (data) {
          setProfile({
            full_name: data.full_name || '',
            phone: data.phone || '',
            address: data.address || '',
          });
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          updated_at: new Date(),
        });

      if (error) {
        showError('Erro ao atualizar perfil');
        console.error('Erro ao atualizar perfil:', error);
      } else {
        showSuccess('Perfil atualizado com sucesso!');
      }
    } catch (error) {
      showError('Erro ao atualizar perfil');
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600 mt-2">Gerencie suas informações pessoais</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{profile.full_name || 'Usuário'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>Email verificado</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.address && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.address}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Editar Informações</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={user.email || ''} 
                        disabled 
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">
                        O email não pode ser alterado
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Nome Completo</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={profile.full_name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Seu endereço completo"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleLogout}
                    className="flex-1"
                  >
                    Sair da Conta
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
      
      <MadeWithDyad />
    </div>
  );
};

export default Profile;