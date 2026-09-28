import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AnimatedSplash } from '@/components/animated-splash';
import { AuthProvider, useAuth } from '@/features/auth/auth-context';
import { useThemeColors } from '@/hooks/use-theme-colors';

SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({ duration: 200, fade: true });

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

function RootNavigator() {
  const { user, isLoading } = useAuth();
  const colors = useThemeColors();
  const cache = useQueryClient();
  const [splashDone, setSplashDone] = useState(false);
  const isSignedIn = !!user;

  useEffect(() => {
    if (!user) cache.clear();
  }, [user, cache]);

  return (
    <View style={{ flex: 1 }}>
      {!isLoading && (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isSignedIn}>
            <Stack.Screen name="(app)" />
            <Stack.Screen
              name="election/[id]"
              options={{
                headerShown: true,
                title: 'Ballot',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.text,
              }}
            />
          </Stack.Protected>
          <Stack.Protected guard={!isSignedIn}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
        </Stack>
      )}
      {!splashDone && <AnimatedSplash ready={!isLoading} onFinish={() => setSplashDone(true)} />}
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}