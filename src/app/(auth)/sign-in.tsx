import { useState } from 'react';
import { ActivityIndicator, Button } from 'react-native';

import { ScreenPlaceholder } from '@/components/screen-placeholder';
import { useAuth } from '@/features/auth/auth-context';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [busy, setBusy] = useState(false);

  const handleSignIn = async () => {
    setBusy(true);
    try {
      await signIn('demo', 'demo'); // replaced by a real form later
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScreenPlaceholder title="Daeyang Voting">
      {busy ? <ActivityIndicator /> : <Button title="Sign in (demo)" onPress={handleSignIn} />}
    </ScreenPlaceholder>
  );
}
