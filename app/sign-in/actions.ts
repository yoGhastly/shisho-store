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
      throw new Error(`Email ${email} is not an admin user`);
    }

    return {
      isAdmin: data.email ? true : false,
    };
  } catch (error: any) {
    throw new Error(`Error handling admin status ${error.message}`);
  }
};
