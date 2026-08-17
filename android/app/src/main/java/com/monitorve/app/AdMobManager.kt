package com.monitorve.app

import android.app.Activity
import android.content.Context
import android.util.DisplayMetrics
import android.view.ViewGroup
import com.google.android.gms.ads.*

/**
 * Senior Android AdMob Manager for Monitor VE
 * Handles initialization and adaptive banner loading seamlessly.
 */
object AdMobManager {

    // Official AdMob Credentials
    const val APP_ID = "ca-app-pub-8691199752535040~6291064809"
    const val BANNER_AD_UNIT_ID = "ca-app-pub-8691199752535040/7699565579"

    /**
     * Initialize Google Mobile Ads SDK on App Startup
     */
    fun initialize(context: Context, onInitialized: (() -> Unit)? = null) {
        MobileAds.initialize(context) { initializationStatus ->
            onInitialized?.invoke()
        }
    }

    /**
     * Load adaptive bottom banner ad into the container layout
     */
    fun loadAdaptiveBanner(activity: Activity, container: ViewGroup): AdView {
        val adView = AdView(activity)
        adView.adUnitId = BANNER_AD_UNIT_ID

        // Compute adaptive ad size
        val display = activity.windowManager.defaultDisplay
        val outMetrics = DisplayMetrics()
        display.getMetrics(outMetrics)
        val density = outMetrics.density
        val adWidthPixels = container.width.toFloat()
        val adWidth = if (adWidthPixels > 0) {
            (adWidthPixels / density).toInt()
        } else {
            (outMetrics.widthPixels / density).toInt()
        }
        val adSize = AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(activity, adWidth)
        adView.setAdSize(adSize)

        container.removeAllViews()
        container.addView(adView)

        val adRequest = AdRequest.Builder().build()
        adView.loadAd(adRequest)
        return adView
    }
}
