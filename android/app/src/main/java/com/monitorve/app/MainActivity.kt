package com.monitorve.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.LoadAdError

/**
 * Senior Android MainActivity for Monitor VE
 * Manages the Sticky Bottom AdMob Banner and the Financial Rates WebView.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private var adView: AdView? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Initialize Google Mobile Ads SDK with official App ID: ca-app-pub-8691199752535040~6291064809
        AdMobManager.initialize(this) {
            setupStickyBottomBanner()
        }

        // 2. Setup WebView with JavaScript Interface Bridge
        webView = findViewById(R.id.webView)
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT

        webView.addJavascriptInterface(WebAppInterface(), "AndroidBridge")
        webView.webViewClient = WebViewClient()
        
        // Load production URL or local asset
        webView.loadUrl("https://ais-dev-o5t2np2p4kniase4qvlkmk-579236799243.us-west2.run.app")
    }

    /**
     * Set up anchored adaptive banner at the bottom of the screen
     */
    private fun setupStickyBottomBanner() {
        val bannerContainer = findViewById<LinearLayout>(R.id.admob_sticky_bottom_container) ?: return
        
        adView = findViewById(R.id.adView) ?: AdMobManager.loadAdaptiveBanner(this, bannerContainer)
        
        adView?.adListener = object : AdListener() {
            override fun onAdLoaded() {
                super.onAdLoaded()
                bannerContainer.visibility = View.VISIBLE
            }

            override fun onAdFailedToLoad(error: LoadAdError) {
                super.onAdFailedToLoad(error)
                // Log or handle fallback gracefully
            }
        }

        val adRequest = AdRequest.Builder().build()
        adView?.loadAd(adRequest)
    }

    /**
     * JavaScript Interface Bridge for communication between Web app and Android Native
     */
    inner class WebAppInterface {
        @JavascriptInterface
        fun initAdMob(appId: String) {
            // Already initialized with official ID
        }

        @JavascriptInterface
        fun showBanner(adUnitId: String, position: String) {
            runOnUiThread {
                findViewById<View>(R.id.admob_sticky_bottom_container)?.visibility = View.VISIBLE
            }
        }

        @JavascriptInterface
        fun hideBanner() {
            runOnUiThread {
                findViewById<View>(R.id.admob_sticky_bottom_container)?.visibility = View.GONE
            }
        }
    }

    override fun onPause() {
        adView?.pause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        adView?.resume()
    }

    override fun onDestroy() {
        adView?.destroy()
        super.onDestroy()
    }
}
