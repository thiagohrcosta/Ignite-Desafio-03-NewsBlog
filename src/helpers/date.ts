/* eslint-disable consistent-return */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = date => {
  if (!date) return;

  return format(new Date(date), 'dd MMM yyyy', { locale: ptBR });
};
