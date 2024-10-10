import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = environment.supabase.url;
  private supabaseKey = environment.supabase.key;
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  async upload(file:File, fileName:string, folderName:string = 'base'){
    const { error } = await this.supabase
      .storage
      .from('web')
      .upload(`${folderName}/${fileName}`, file);
    if(error){
      return;
    }

    const { data } = await this.supabase
      .storage
      .from(folderName)
      .getPublicUrl(`${folderName}/${fileName}`)
    return data.publicUrl;
  }
}
