import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { scamType, targetValue, description } = body;

    if (!targetValue || !targetValue.trim()) {
      return NextResponse.json(
        { error: 'Nomor rekening atau nomor telepon yang dilaporkan wajib diisi.' },
        { status: 400 }
      );
    }

    const cleanTarget = targetValue.replace(/[^0-9a-zA-Z]/g, '').trim();

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from('reported_scams')
      .insert({
        reporter_id: session?.user?.id || null,
        scam_type: scamType || 'Nomor Rekening / HP',
        target_value: cleanTarget,
        description: description?.trim() || null,
        status: 'pending',
      })
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Submit report error:', error);
      return NextResponse.json(
        { error: 'Gagal menyimpan laporan penipuan.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Laporan penipuan berhasil dicatat dalam database Tumbasna.',
      reportId: data.id,
    });
  } catch (error) {
    console.error('Submit report API error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server saat mengirimkan laporan.' },
      { status: 500 }
    );
  }
}
