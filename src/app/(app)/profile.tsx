import { Button } from 'react-native';

import { ScreenPlaceholder } from '@/components/screen-placeholder';
import { useAuth } from '@/features/auth/auth-context';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <ScreenPlaceholder title={user?.name ?? 'Profile'}>
      <Button title="Sign out" onPress={signOut} />
    </ScreenPlaceholder>
  );
}
