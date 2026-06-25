import { NextResponse } from 'next/server';
import { adminAuth,adminDb } from '@/lib/admin/firebaseAdmin';

export async function POST(request: Request) {
  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'UID é obrigatório' }, { status: 400 });
    }

    // 1. Deleta o usuário do Firebase Authentication (Email/Senha)
    await adminAuth.deleteUser(uid);

    // 2. Deleta o documento do usuário do Firestore (Sua coleção 'usuarios')
    await adminDb.collection('usuarios').doc(uid).delete();

    return NextResponse.json({ message: 'Usuário deletado com sucesso do Auth e Firestore!' }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}