export type User = { id: string; name: string };

export async function login(studentId: string, password: string): Promise<User> {
  // TODO: replace with the real API call
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { id: studentId, name: 'Demo Student' };
}
