import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { API_BASE_URL } from '../../data/environment';

type SendEmailPayload = {
  to: string;
  subject: string;
  text: string;
  token: string;
};

const sendEmail = async (payload: SendEmailPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .post(`${API_BASE_URL}/email/send`, payload)
    .then(({ data }) => data);

export const useSendEmailMutation = () =>
  useMutation({
    mutationFn: (payload: SendEmailPayload) => sendEmail(payload),
  });
