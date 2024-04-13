/**
 * Its a collection of all api urls
 * Define methods to set http method api urls
 */
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class RequestUtils {


    // static API_BASE_URL: string;
    public static BASE_URL: string = environment.baseUrl;

    getBaseUrl(): string {
        return RequestUtils.BASE_URL;
    }

    auth() {
        return {
            register: "user/register",
            authenticate: "user/authenticate"
        }
    }


    user() {
        return {
            getProfile: "user/profile",
            update: "user/update/",
            resetPassword: "user/reset_password",
            updatePassword: "user/update_password"
        }
    }


    post() {
        return {
            addPosts: "posts/add",
            getCsgoPosts: "posts/csgo/",
            getBadmintonPosts: "posts/badminton/",
            getSinglePost: "posts/post/",
            addEvents: "events/add",
            getEvents: "events/getEvents",
            addFaqs: "faqs/add",
            getFaqs: "faqs/getFaqs"
        }
    }


    sendEmail() {
        return {
            contact: "send/contact",
            resetPassword: "send/reset-password",
            paymentInvoice: "send/payment-invoice",
            teamInvite: "send/send-team-invite",
        }
    }

    payment() {
        return {
            createHash: "payments/createHash",
            addParticipantUser: "payments/addUser",
        }
    }

    participants() {
        return {
            addParticipantUser: "payments/addUser",
            getParticipantUser: "user/getParticipantUser/",

        }
    }

    team() {
        return {
            addTeam: "team/add",
            getTeam: "team/getTeam",
            getAllTeams: "team/getAllTeams",
            checkTeamName: "payments/check-team-name",
        }
    }

    search() {
        return {
            searchUsers: "user/search-users"
        }
    }


}
