import { supabase } from '../lib/subapase/client';

export const checkAdminStatus = async ({ email }: { email: string }) => {
  'use server';
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error(`Email ${email} is not an admin user`);
      return { isAdmin: false };
    }

    return {
      isAdmin: data.email ? true : false,
    };
  } catch (error: any) {
    throw new Error(`Error handling admin status ${error.message}`);
  }
};
