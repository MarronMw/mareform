import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet } from 'react-native';

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
      {busy ? <ActivityIndicator /> : <Button color={'tomato'}  title="Sign in (demo)" onPress={handleSignIn} />}
    </ScreenPlaceholder>
  );
}

const styles=StyleSheet.create({
  btn:{
    backgroundColor:'#ff0099',
  }
});
